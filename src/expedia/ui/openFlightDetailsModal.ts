import { MissingElementLookupError } from "../../shared/errors";

const MODAL_SELECTOR = "[data-test-id='select-link']";

export const openFlightDetailsModal = (flightContainer: Element): void => {
  const modalOpenElement: HTMLElement = flightContainer.querySelector(MODAL_SELECTOR) as HTMLElement;
  if (!modalOpenElement) {
    throw new MissingElementLookupError(`Unable to find modal open element via ${MODAL_SELECTOR}`);
  }

  modalOpenElement.click();
};
