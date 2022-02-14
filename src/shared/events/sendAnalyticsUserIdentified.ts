export const sendAnalyticsUserIdentified = (id: string, email?: string | undefined | null): void => {
  chrome.runtime.sendMessage({
    event: "LOG_ANALYTICS_USER_IDENTIFIED",
    userId: id,
    email,
  });
};
