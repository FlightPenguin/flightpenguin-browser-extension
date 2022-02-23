import { MissingElementLookupError } from "../../shared/errors";

const CLOSE_BUTTON_TEXT_SELECTOR = "title[id='undefined-close-toolbar-title']";

export const closeFlightDetailsModal = (): void => {
  const closeButtonTextElement = document.querySelector(CLOSE_BUTTON_TEXT_SELECTOR) as HTMLTitleElement;
  if (!closeButtonTextElement) {
    throw new MissingElementLookupError(`Unable to find modal close text element via ${closeButtonTextElement}`);
  }

  const button = closeButtonTextElement.closest("button") as HTMLButtonElement;
  if (!button) {
    throw new MissingElementLookupError(`Unable to find modal close button`);
  }
  button.click();
};
