import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";

const NEXT_PAGE_NUMBER_SELECTOR = "li[class*='pagination__item is--item-next']";

export const clickNextPage = (): void => {
  const nextPageElement = document.querySelector(NEXT_PAGE_NUMBER_SELECTOR);
  if (!nextPageElement) {
    throw new MissingElementLookupError("Unable to retrieve next page element");
  }

  if (!nextPageElement.children.length) {
    throw new MissingFieldParserError("Unable to extract next page link");
  }

  const link = nextPageElement.children[0] as HTMLLinkElement;
  link.click();
};
