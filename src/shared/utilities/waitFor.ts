import { waitForTheElement, waitForTheElementToDisappear } from "wait-for-the-element";

import { LoadingTimeoutParserError } from "../errors";

export const waitForDisappearance = async (loadingTimeout: number, selector: string) => {
  if (document.querySelector(selector)) {
    const loadingIndicator = await waitForTheElementToDisappear(selector, {
      timeout: loadingTimeout,
    });
    if (!loadingIndicator) {
      throw new LoadingTimeoutParserError(
        `Took longer than ${loadingTimeout} ms to make the loading indicator (${selector}) disappear`,
      );
    }
  }
};

export const waitForAppearance = async (loadingTimeout = 3000, selector: string) => {
  if (!document.querySelector(selector)) {
    const container = await waitForTheElement(selector, { timeout: loadingTimeout });
    if (!container) {
      throw new LoadingTimeoutParserError(`Render of ${selector} failed to complete in ${loadingTimeout}`);
    }
  }
};
