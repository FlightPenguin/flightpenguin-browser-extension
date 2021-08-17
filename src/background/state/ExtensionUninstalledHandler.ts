export const ExtensionUninstalledHandler = () => {
  chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6", function () {
    console.log("Bye");
  });
};
