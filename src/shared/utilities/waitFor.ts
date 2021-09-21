import { waitForTheElement, waitForTheElementToDisappear } from "wait-for-the-element";

import { LoadingTimeoutParserError } from "../errors";
import { isVisible } from "./isVisible";

export const waitForDisappearance = async (
  loadingTimeout: number,
  selector: string,
  doc = window.document as HTMLDocument | Element | HTMLElement,
): Promise<void> => {
  if (doc.querySelector(selector)) {
    const loadingIndicator = await waitForTheElementToDisappear(selector, {
      timeout: loadingTimeout,
      // @ts-ignore
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
): Promise<HTMLElement> => {
  let container = doc.querySelector(selector);
  if (!container) {
    container = await waitForTheElement(selector, { timeout: loadingTimeout, scope: doc });
    if (!container) {
      throw new LoadingTimeoutParserError(`Render of ${selector} failed to complete in ${loadingTimeout}`);
    }
  }
  return container;
};

export const waitForInvisible = async (
  disappearanceTimeout = 5000,
  selector: string,
  doc = window.document as HTMLDocument | Element | HTMLElement,
): Promise<void> => {
  let visible = true;

  const startTime = new Date();
  while (visible && startTime.valueOf() - new Date().valueOf() < disappearanceTimeout) {
    const selectedElement = doc.querySelector(selector) as HTMLElement;
    if (!selectedElement) {
      visible = false;
    }
    visible = isVisible(selectedElement);
  }

  if (visible) {
    throw new LoadingTimeoutParserError(`Took longer than ${disappearanceTimeout} to make ${selector} disappear`);
  }
};
