import { waitForTheElement } from "wait-for-the-element";

import { MissingElementLookupError } from "../../shared/errors";

const MODAL_SELECTOR = "[data-test-id='details-and-fares']:not(:empty)";

export const getFlightDetailsModal = async (timeout = 60_000) => {
  const modal = await waitForTheElement(MODAL_SELECTOR, { timeout });
  if (!modal) {
    throw new MissingElementLookupError(`Unable to locate modal after ${timeout} ms`);
  }
  return modal;
};
