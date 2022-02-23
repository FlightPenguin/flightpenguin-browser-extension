import { waitForAppearance } from "../../shared/utilities/waitFor";

const MERGE_SELECTOR = "div[class*='list-switch__merge']";

export const ensureBookTogetherSelected = async (): Promise<void> => {
  const div = await waitForAppearance(60000, MERGE_SELECTOR);
  div.click();
};
