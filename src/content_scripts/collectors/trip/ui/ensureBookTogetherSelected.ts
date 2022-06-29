import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const MERGE_SELECTOR = "div[class*='list-switch__merge']";

export const ensureBookTogetherSelected = async (): Promise<void> => {
  try {
    const div = await waitForAppearance(60000, MERGE_SELECTOR);
    div.click();
  } catch (e) {
    console.debug("No merge flight results selector available... pray and hope");
  }
};
