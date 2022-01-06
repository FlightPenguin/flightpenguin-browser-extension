import { MissingElementLookupError } from "../../shared/errors";
import { waitForDisappearance } from "../../shared/utilities/waitFor";

const MODAL_SELECTOR = "div.ift-modal-container.flight-detail-info";
const CLOSE_ICON_SELECTOR = "i.ift-modal-close";

export const closeModal = async (modal: HTMLDivElement): Promise<void> => {
  const closeIcon = modal.querySelector(CLOSE_ICON_SELECTOR) as HTMLElement;
  if (!closeIcon) {
    throw new MissingElementLookupError("Unable to find modal close button");
  }

  closeIcon.click();
  await waitForDisappearance(5000, MODAL_SELECTOR);
};
