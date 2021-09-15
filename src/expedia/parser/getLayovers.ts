import { waitForTheElement } from "wait-for-the-element";

import { MissingElementLookupError, ParserError } from "../../shared/errors";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getLegDetails } from "./getLegDetails";

const LEG_SELECTOR = "[data-test-id^='journey-section']";

export const getLayovers = async (modal: Element, timeout = 3000): Promise<FlightLeg[]> => {
  const firstLeg = await waitForTheElement(LEG_SELECTOR, { timeout });
  if (!firstLeg) {
    throw new MissingElementLookupError(`Could not find ${LEG_SELECTOR} in modal after ${timeout} ms`);
  }
  const legs = modal.querySelectorAll(LEG_SELECTOR);
  if (!legs) {
    throw new MissingElementLookupError("Could not find legs in modal");
  }

  const layovers = Array.from(legs).map((leg, index) => {
    return getLegDetails(leg, index);
  });

  if (!layovers) {
    throw new ParserError("Unable to identify layovers");
  }

  return layovers;
};
