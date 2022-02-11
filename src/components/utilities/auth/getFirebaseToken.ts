import { getAuth } from "firebase/auth";

export const getFirebaseToken = async (forceRefresh = true): Promise<string> => {
  const auth = getAuth();
  if (!auth) {
    throw new Error("Firebase not initialized before getAuthToken is called");
  }

  if (!auth.currentUser) {
    throw new Error("getAuthToken called before firebase synced");
  }

  return await auth.currentUser.getIdToken(forceRefresh);
};
