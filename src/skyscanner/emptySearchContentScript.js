Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});
chrome.runtime.sendMessage({
  event: "NO_FLIGHTS_FOUND",
  provider: "skyscanner",
});
