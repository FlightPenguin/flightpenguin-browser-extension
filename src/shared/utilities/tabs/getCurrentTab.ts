export const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  return await getCurrentTabPromise();
};

const getCurrentTabPromise = (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length) {
        const tab = tabs[0];
        resolve(tab);
      }
    });
  });
};
