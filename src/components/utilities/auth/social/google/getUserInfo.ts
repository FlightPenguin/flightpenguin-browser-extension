import { getAuth } from "firebase/auth";

import { UserSocialAuthProfile } from "../types/UserSocialAuthProfile";

export const getUserInfo = (): UserSocialAuthProfile => {
  const auth = getAuth();
  if (!auth) {
    throw new Error("Firebase not initialized before getUserInfo is called");
  }

  if (!auth.currentUser) {
    throw new Error("getUserInfo called before firebase synced");
  }

  const providerInfo = auth.currentUser.providerData.filter((provider) => {
    return provider.providerId === "google.com";
  })[0];
  if (!providerInfo) {
    throw new Error("could not extract provider data for google.com");
  }

  if (!auth.currentUser.email || !auth.currentUser.displayName) {
    throw new Error("Unable to extract user specific data");
  }

  return {
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
    photoUrl: auth.currentUser.photoURL,
    id: providerInfo.uid,
  };
};
