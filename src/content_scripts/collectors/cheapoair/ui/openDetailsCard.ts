import { MissingElementLookupError } from "../../../../shared/errors";
import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const FLIGHT_SEGMENT_DETAILS_SELECTOR = "a[class*='is--flight-details-link']";
const FLIGHT_SEGMENTS_SECTION_SELECTOR = "section[class*='contract-details']";

export const openDetailsCard = async (flightCard: HTMLElement): Promise<HTMLElement> => {
  const openFlightDetailsButton = flightCard.querySelector(FLIGHT_SEGMENT_DETAILS_SELECTOR) as HTMLLinkElement;
  if (!openFlightDetailsButton) {
    throw new MissingElementLookupError("Unable to find flight details open link");
  }

  openFlightDetailsButton.click();
  return (await waitForAppearance(5000, FLIGHT_SEGMENTS_SECTION_SELECTOR)) as HTMLElement;
};
