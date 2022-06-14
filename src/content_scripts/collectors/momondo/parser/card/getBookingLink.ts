import { MissingElementLookupError } from "../../../../../shared/errors";

const LINK_SELECTOR = "a[class*='booking-link']";

export const getBookingLink = (itineraryCard: HTMLDivElement): string => {
  const linkElement = itineraryCard.querySelector(LINK_SELECTOR) as HTMLLinkElement;
  if (!linkElement) {
    throw new MissingElementLookupError("Unable to find booking link element");
  }

  return linkElement.href;
};
