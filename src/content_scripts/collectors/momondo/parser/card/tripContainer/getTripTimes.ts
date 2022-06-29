import { MissingElementLookupError, MissingFieldParserError } from "../../../../../../shared/errors";

const DEPARTURE_SELECTOR = "span[class*='depart-time']";
const ARRIVAL_SELECTOR = "span[class*='arrival-time']";
const CONTAINER_SELECTOR = "span[class='time-pair']";

export const getTripTimes = (tripContainer: HTMLLIElement): { departureTime: string; arrivalTime: string } => {
  return {
    departureTime: getFlightTime(tripContainer, DEPARTURE_SELECTOR),
    arrivalTime: getFlightTime(tripContainer, ARRIVAL_SELECTOR),
  };
};

const getFlightTime = (tripContainer: HTMLLIElement, selector: string): string => {
  const hoursMinsElement = tripContainer.querySelector(selector);
  if (!hoursMinsElement) {
    throw new MissingElementLookupError("Unable to find hours mins element");
  }

  const timeContainer = hoursMinsElement.closest(CONTAINER_SELECTOR);
  if (!timeContainer) {
    throw new MissingElementLookupError("Unable to find time parent element");
  }

  const rawText = timeContainer.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract time text");
  }

  return rawText.replace(/\s+/g, "");
};
