import { MissingElementLookupError, MissingFieldParserError } from "../../../../shared/errors";

const ACTIVE_PAGE_NUMBER_SELECTOR = "li[class*='pagination__item is--item-active']";

export const getActivePage = (): number => {
  const activePage = document.querySelector(ACTIVE_PAGE_NUMBER_SELECTOR);
  if (!activePage) {
    throw new MissingElementLookupError("Unable to retrieve active page element");
  }

  if (!activePage.textContent) {
    throw new MissingFieldParserError("Unable to extract active page number");
  }

  return Number(activePage.textContent);
};
