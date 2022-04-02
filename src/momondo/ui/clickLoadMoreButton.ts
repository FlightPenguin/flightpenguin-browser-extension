import { MissingElementLookupError } from "../../shared/errors";

const BUTTON_SELECTOR = "a[class='moreButton']";

export const clickLoadMoreButton = async (): Promise<void> => {
  const buttonElement = document.querySelector(BUTTON_SELECTOR) as HTMLLinkElement;
  if (!buttonElement) {
    // this button stupidly always exists
    throw new MissingElementLookupError("Unable to find show more button");
  }

  buttonElement.click();
};
