import { MissingElementLookupError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { waitForDisappearance } from "../../shared/utilities/waitFor";

const MODAL_SELECTOR = "div[class*='FlightResultFareModalDetailsDialog'][class*='animate'][aria-hidden='false']";
const BUTTON_SELECTOR = "button[class*='back-btn']:not([class*='back-btn-s'])";

export const closeAllVisibleModals = async (): Promise<void> => {
  const visibleModals = Array.from(document.querySelectorAll(MODAL_SELECTOR) as NodeListOf<HTMLDivElement>);
  visibleModals.forEach((visibleModal) => {
    const button = visibleModal.querySelector(BUTTON_SELECTOR) as HTMLButtonElement;
    if (!button) {
      throw new MissingElementLookupError("Unable to find back button in modal");
    }
    button.click();
  });
  await waitForDisappearance(10000, MODAL_SELECTOR);
  if (visibleModals.length) {
    await pause(100);
  }
};
