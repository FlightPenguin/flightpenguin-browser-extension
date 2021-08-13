import { waitForTheElement, waitForTheElementToDisappear } from "wait-for-the-element";

import { LoadingTimeoutParserError } from "../errors";

export const waitForDisappearance = async (
  loadingTimeout: number,
  selector: string,
  doc = window.document as HTMLDocument | Element | HTMLElement,
) => {
  if (doc.querySelector(selector)) {
    const loadingIndicator = await waitForTheElementToDisappear(selector, {
      timeout: loadingTimeout,
      scope: doc,
    });
    if (!loadingIndicator) {
      throw new LoadingTimeoutParserError(
        `Took longer than ${loadingTimeout} ms to make the loading indicator (${selector}) disappear`,
      );
    }
  }
};

export const waitForAppearance = async (
  loadingTimeout = 3000,
  selector: string,
  doc = window.document as HTMLDocument | Element | HTMLElement,
) => {
  let container = doc.querySelector(selector);
  if (!container) {
    container = await waitForTheElement(selector, { timeout: loadingTimeout, scope: doc });
    if (!container) {
      throw new LoadingTimeoutParserError(`Render of ${selector} failed to complete in ${loadingTimeout}`);
    }
  }
  return container;
};
