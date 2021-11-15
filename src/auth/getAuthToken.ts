export const getAuthToken = async (): Promise<string> => {
  return await getAuthTokenPromise();
};

const getAuthTokenPromise = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      resolve(token);
    });
  });
};
