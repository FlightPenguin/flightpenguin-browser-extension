// mock chrome api's
Object.assign(global, require("jest-chrome"));

if (!chrome.runtime) chrome.runtime = {};
if (!chrome.runtime.id) chrome.runtime.id = "history-delete";
