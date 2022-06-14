// data-test="Journey-toggle"

import { MissingElementLookupError } from "../../../../shared/errors";
import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const TOGGLE_WRAPPER_SELECTOR = "[data-test='Journey-toggle']";
const MODAL_SELECTOR = "[data-test='ResultCardModal']";

export const getLayoversDetailModal = async (flightCard: HTMLDivElement): Promise<HTMLDivElement> => {
  const toggleWrapper = flightCard.querySelector(TOGGLE_WRAPPER_SELECTOR) as HTMLDivElement;
  if (!toggleWrapper) {
    throw new MissingElementLookupError("Unable to find toggle wrapper");
  }

  toggleWrapper.click();

  return (await waitForAppearance(30000, MODAL_SELECTOR)) as HTMLDivElement;
};
