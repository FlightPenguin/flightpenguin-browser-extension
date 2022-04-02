import { MissingElementLookupError } from "../../../../shared/errors";
import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const MODAL_SELECTOR = "div[class*='FlightResultFareModalDetailsDialog']";

export const getModal = async (itineraryCard: HTMLDivElement): Promise<HTMLDivElement> => {
  try {
    return (await waitForAppearance(5000, MODAL_SELECTOR, itineraryCard)) as HTMLDivElement;
  } catch (e) {
    throw new MissingElementLookupError("Unable to locate modal in card");
  }
};
