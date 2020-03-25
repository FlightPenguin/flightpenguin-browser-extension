// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage
chrome.runtime.onInstalled.addListener(function() {
  console.log("Is this thing on?");
});

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  /**
    from: "sfo"
    to: "lax"
    southwest: false
    priceline: true
    cabin: "Economy"
    fromDate: "2020-03-24"
    toDate: "2020-03-25"
    numPax: 2
     */
  console.log("formData", message);
});
