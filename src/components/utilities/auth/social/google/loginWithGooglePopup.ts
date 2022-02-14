import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { AnalyticsManager } from "../../../../../background/AnalyticsManager";
import { sendAnalyticsUserIdentified } from "../../../../../shared/events";
import { getSubscriptionValidity } from "../../getSubscriptionValidity";

export const loginWithGooglePopup = async (
  auth: Auth,
  provider: GoogleAuthProvider,
  analytics: AnalyticsManager,
  successCallback: () => void,
  failureCallback: () => void,
): Promise<void> => {
  const authResult = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(authResult);
  const accessToken = credential?.accessToken;

  let apiResponse;
  if (accessToken) {
    apiResponse = await getSubscriptionValidity({ accessToken });
    if (apiResponse.status && apiResponse.data && apiResponse.data.status) {
      const userId = authResult.user.providerData[0]?.uid;
      const email = authResult.user.email;
      if (userId) {
        analytics.identify({ userId });
        sendAnalyticsUserIdentified(userId, email);
      }

      successCallback();
    } else {
      failureCallback();
    }
  } else {
    failureCallback();
  }
};
