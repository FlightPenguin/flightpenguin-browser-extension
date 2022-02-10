import { GoogleAuthProvider } from "firebase/auth";
export const initGoogleProvider = (): GoogleAuthProvider => {
  const provider = new GoogleAuthProvider();
  provider.addScope("openid");
  provider.addScope("profile");
  provider.addScope("email");
  return provider;
};
