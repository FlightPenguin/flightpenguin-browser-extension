import { MissingElementLookupError } from "../../shared/errors";
import { waitForDisappearance } from "../../shared/utilities/waitFor";

const FLIGHT_SEGMENT_DETAILS_SELECTOR = "a[class*='is--flight-details-link']";
const FLIGHT_SEGMENTS_SECTION_SELECTOR = "section[class*='contract-details']";

export const closeFlightSegmentCard = async (flightCard: HTMLElement): Promise<void> => {
  const closeFlightDetailsButton = flightCard.querySelector(FLIGHT_SEGMENT_DETAILS_SELECTOR) as HTMLLinkElement;
  if (!closeFlightDetailsButton) {
    throw new MissingElementLookupError("Unable to find flight details close link");
  }

  closeFlightDetailsButton.click();
  await waitForDisappearance(5000, FLIGHT_SEGMENTS_SECTION_SELECTOR);
};
