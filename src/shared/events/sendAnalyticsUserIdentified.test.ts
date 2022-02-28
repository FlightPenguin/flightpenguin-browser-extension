import { sendAnalyticsUserIdentified } from "./sendAnalyticsUserIdentified";

describe("sendAnalyticsUserIdentified happy path", () => {
  it("calls chrome.runtime.sendMessage with no email input", () => {
    sendAnalyticsUserIdentified("abcd1234");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "LOG_ANALYTICS_USER_IDENTIFIED",
      userId: "abcd1234",
      email: undefined,
    });
  });

  it("calls chrome.runtime.sendMessage with email input", () => {
    sendAnalyticsUserIdentified("abcd1234", "max@example.net");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "LOG_ANALYTICS_USER_IDENTIFIED",
      userId: "abcd1234",
      email: "max@example.net",
    });
  });
});
