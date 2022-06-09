import * as Sentry from "@sentry/browser";
import cryptoRandomString from "crypto-random-string";
import {
  Auth,
  GoogleAuthProvider,
  OAuthCredential,
  signInWithCredential,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import * as browser from "webextension-polyfill";

import { AnalyticsManager } from "../../../../../background/AnalyticsManager";
import { sendAnalyticsUserIdentified } from "../../../../../shared/events";
import { isFirefoxExtension } from "../../../../../shared/utilities/isFirefoxExtension";
import { getSubscriptionValidity } from "../../getSubscriptionValidity";

export const loginWithGooglePopup = async (
  auth: Auth,
  provider: GoogleAuthProvider,
  analytics: AnalyticsManager,
  successCallback: () => void,
  failureCallback: () => void,
  emailConsent: boolean | undefined = undefined,
): Promise<void> => {
  try {
    const { userCredential, oauthCredential } = await getCredential(auth, provider);
    if (!userCredential || !oauthCredential) {
      console.error("Unable to determine credentials");
      failureCallback();
      return;
    }
    const accessToken = oauthCredential?.accessToken;
    let apiResponse;
    if (accessToken) {
      apiResponse = await getSubscriptionValidity({ accessToken, emailConsent });
      if (apiResponse.status && apiResponse.data && apiResponse.data.status) {
        const userId = userCredential.user.providerData[0]?.uid;
        const email = userCredential.user.email;
        if (userId) {
          analytics.identify({ userId });
          sendAnalyticsUserIdentified(userId, email);
        }

        successCallback();
      } else {
        console.warn("Unacceptable API response");
        failureCallback();
        return;
      }
    } else {
      console.warn("No access token");
      failureCallback();
      return;
    }
  } catch (e) {
    console.warn(e);
    Sentry.captureException(e);
    failureCallback();
  }
};

export const getCredential = async (
  auth: Auth,
  provider: GoogleAuthProvider,
): Promise<{ oauthCredential: OAuthCredential | null; userCredential: UserCredential | null }> => {
  let userCredential: UserCredential | null = null;
  let oauthCredential: OAuthCredential | null = null;
  if (isFirefoxExtension()) {
    const nonce = cryptoRandomString({ length: 12, type: "url-safe" });
    const redirectUrl = browser.identity.getRedirectURL();
    // firefox allows us to set manifest properties that aren't exactly conforming.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const oauthClientId = browser.runtime.getManifest().oauth2.client_id;

    const responseUrl = await browser.identity.launchWebAuthFlow({
      url: `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&nonce=${nonce}&scope=openid%20profile&client_id=${oauthClientId}&redirect_uri=${redirectUrl}`,
      interactive: true,
    });
    const idToken = responseUrl.split("id_token=")[1].split("&")[0];
    oauthCredential = GoogleAuthProvider.credential(idToken);
    userCredential = await signInWithCredential(auth, oauthCredential);
  } else {
    userCredential = await signInWithPopup(auth, provider);
    oauthCredential = GoogleAuthProvider.credentialFromResult(userCredential);
  }
  return { oauthCredential, userCredential };
};
