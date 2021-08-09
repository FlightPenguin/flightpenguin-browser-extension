import { waitForTheElement } from "wait-for-the-element";

import { MissingElementLookupError } from "../../shared/errors";

const COLLAPSIBLE_SELECTOR = "summary";

export const openLayoverDetailsCollapsible = async (modalContainer: Element, timeout = 5000) => {
  const collapsibleController = (await waitForTheElement(COLLAPSIBLE_SELECTOR, { timeout })) as HTMLElement;
  if (!collapsibleController) {
    throw new MissingElementLookupError(`Unable to find collapsible open element via ${COLLAPSIBLE_SELECTOR}`);
  }

  collapsibleController.click();
};
