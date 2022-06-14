import { MissingElementLookupError, MissingFieldParserError } from "../../../../shared/errors";

const PAGE_SELECTOR = "a[class*='pagination__item--action'][data-test*='paging-']";

export const getPageCount = (): number => {
  const pageLinks = document.querySelectorAll(PAGE_SELECTOR) as NodeListOf<HTMLLinkElement>;
  if (!pageLinks || !pageLinks.length) {
    throw new MissingElementLookupError("Unable to retrieve page link elements");
  }

  const lastPage = Array.from(pageLinks).slice(-1)[0];
  if (!lastPage.textContent) {
    throw new MissingFieldParserError("Unable to extract last page number");
  }

  return Number(lastPage.textContent);
};
