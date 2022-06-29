const INDICATOR_SELECTOR = "span[class*='featured-booking-extra']";

export const getIsFirstParty = (container: HTMLLIElement): boolean => {
  const indicatorElement = container.querySelector(INDICATOR_SELECTOR) as HTMLSpanElement;
  if (!indicatorElement) {
    return false;
  }

  const text = indicatorElement.textContent;
  if (!text) {
    return false;
  }

  const searchText = text.toLowerCase();

  if (searchText.includes("mix") && searchText.includes("match")) {
    return false;
  }

  return searchText.includes("book") && searchText.includes("airline");
};
