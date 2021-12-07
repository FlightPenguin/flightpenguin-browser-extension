export const getAuthToken = async (interactive = true): Promise<string> => {
  return await getAuthTokenPromise(interactive);
};

const getAuthTokenPromise = (interactive: boolean): Promise<string> => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive }, (token) => {
      resolve(token);
    });
  });
};
