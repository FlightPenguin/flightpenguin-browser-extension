import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

import { FIREBASE_CONFIG } from "../../../background/constants";

interface InitFirebaseOutput {
  app: FirebaseApp;
  auth: Auth;
}

export const initFirebase = (): InitFirebaseOutput => {
  const firebaseApp = initializeApp(FIREBASE_CONFIG);
  const auth = getAuth();

  return { app: firebaseApp, auth };
};
