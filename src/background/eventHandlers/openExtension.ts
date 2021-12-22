import { openExtension } from "../state/openExtension";
import MessageSender = chrome.runtime.MessageSender;
import { AnalyticsManager } from "../AnalyticsManager";

export const handleOpenExtensionRequest = async (sender: MessageSender, analytics: AnalyticsManager): Promise<void> => {
  console.log("User requested extension load");
  await openExtension(analytics);

  const tab = sender.tab;
  if (tab && tab.id) {
    chrome.tabs.remove(tab.id);
  }
};
