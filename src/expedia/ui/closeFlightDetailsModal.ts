import { MissingElementLookupError } from "../../shared/errors";

const MODAL_CLOSE_SELECTOR = "button[data-icon='tool-close']";

export const closeFlightDetailsModal = (): void => {
  const modalCloseElement: HTMLElement = document.querySelector(MODAL_CLOSE_SELECTOR) as HTMLElement;
  if (!modalCloseElement) {
    throw new MissingElementLookupError(`Unable to find modal close element via ${MODAL_CLOSE_SELECTOR}`);
  }

  modalCloseElement.click();
};
