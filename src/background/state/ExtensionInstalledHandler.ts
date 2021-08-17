export const ExtensionInstalledHandler = () => {
  chrome.runtime.onInstalled.addListener(function () {
    console.log("Is this thing on?");
  });
};
