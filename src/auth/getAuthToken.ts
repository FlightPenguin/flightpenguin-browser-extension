export const getAuthToken = async (interactive = true): Promise<string> => {
  return await getAuthTokenPromise(interactive);
};

const getAuthTokenPromise = (interactive: boolean): Promise<string> => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive }, (token) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureMessage(chrome.runtime.lastError);
        chrome.identity.clearAllCachedAuthTokens(() => {
          if (interactive) {
            chrome.identity.getAuthToken({ interactive }, (token) => {
              resolve(token);
            });
          } else {
            resolve(token);
          }
        });
      } else {
        resolve(token);
      }
    });
  });
};
