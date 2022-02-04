export const sendAnalyticsUserIdentified = (id: string, email?: string): void => {
  chrome.runtime.sendMessage({
    event: "LOG_ANALYTICS_USER_IDENTIFIED",
    userId: id,
    email,
  });
};
