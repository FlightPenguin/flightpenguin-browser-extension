import { getAuth } from "firebase/auth";

export const logout = async (): Promise<void> => {
  const auth = getAuth();
  if (!auth) {
    throw new Error("Firebase not initialized before getUserInfo is called");
  }

  if (!auth.currentUser) {
    throw new Error("getUserInfo called before firebase synced");
  }

  await auth.signOut();
};
