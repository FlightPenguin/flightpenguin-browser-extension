import { MissingElementLookupError } from "../../shared/errors";
import { waitForAppearance } from "../../shared/utilities/waitFor";

const MODAL_OPEN_SELECTOR = "span[data-testid='u_flightdetails']";
const MODAL_SELECTOR = "div.ift-modal-container.flight-detail-info";

export const openModal = async (flightCard: HTMLDivElement): Promise<HTMLDivElement> => {
  const span = flightCard.querySelector(MODAL_OPEN_SELECTOR) as HTMLSpanElement | null;
  if (!span) {
    throw new MissingElementLookupError("Unable to locate details span");
  }

  span.click();

  const modal = (await waitForAppearance(10000, MODAL_SELECTOR)) as HTMLDivElement;
  return modal;
};
