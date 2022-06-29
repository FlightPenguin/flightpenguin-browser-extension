import { MissingElementLookupError } from "../../../../shared/errors";

const WRAPPER_SELECTOR = "ul[class*='provider-list']";
const BOOKING_CONTAINER_SELECTOR = "li[class*='FlightRatesTable']:not([class*='split-result-view'])";

export const getBookingContainers = (modal: HTMLDivElement): HTMLLIElement[] => {
  const wrapperContainer = modal.querySelector(WRAPPER_SELECTOR) as HTMLUListElement;
  if (!wrapperContainer) {
    throw new MissingElementLookupError("Unable to find booking links container");
  }

  const bookingContainers = wrapperContainer.querySelectorAll(BOOKING_CONTAINER_SELECTOR) as NodeListOf<HTMLLIElement>;
  if (!bookingContainers.length) {
    throw new MissingElementLookupError("Unable to find booking links containers");
  }

  return Array.from(bookingContainers);
};
