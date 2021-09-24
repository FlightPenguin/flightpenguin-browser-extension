import { MissingElementLookupError } from "../../shared/errors";
import { waitForDisappearance } from "../../shared/utilities/waitFor";

const MODAL_SELECTOR = "[data-test='ResultCardModal']";
const MODAL_CLOSE_BUTTON_SELECTOR = "button[data-test='ModalCloseButton']";

export const closeModal = async (modal: HTMLDivElement): Promise<void> => {
  const closeButton = modal.querySelector(MODAL_CLOSE_BUTTON_SELECTOR) as HTMLButtonElement;
  if (!closeButton) {
    throw new MissingElementLookupError("Unable to find modal close button");
  }

  closeButton.click();
  await waitForDisappearance(30000, MODAL_SELECTOR);
};
