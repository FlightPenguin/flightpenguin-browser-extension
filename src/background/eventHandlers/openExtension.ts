import { openExtension } from "../state/openExtension";
import MessageSender = chrome.runtime.MessageSender;

export const handleOpenExtensionRequest = async (sender: MessageSender): Promise<void> => {
  console.log("User requested extension load");
  await openExtension();

  const tab = sender.tab;
  if (tab && tab.id) {
    chrome.tabs.remove(tab.id);
  }
};
