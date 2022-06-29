import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

const FLIGHT_TIME_SELECTOR = "time[class*='is--flight-time']";

export const getFlightTimes = (flightContainer: HTMLDivElement): { departureTime: string; arrivalTime: string } => {
  const timeElements = flightContainer.querySelectorAll(FLIGHT_TIME_SELECTOR);
  if (!timeElements || timeElements.length !== 2) {
    throw new MissingElementLookupError("Unable to retrieve flight details times");
  }

  const [dTimeElement, aTimeElement] = timeElements;
  if (!dTimeElement.textContent) {
    throw new MissingFieldParserError("Unable to extract departure time text");
  }
  if (!aTimeElement.textContent) {
    throw new MissingFieldParserError("Unable to extract departure time text");
  }

  return {
    departureTime: getCleanTime(dTimeElement.textContent.toLowerCase()),
    arrivalTime: getCleanTime(aTimeElement.textContent.toLowerCase()),
  };
};

const getCorrectedDay = (rawText: string): string => {
  if (rawText.includes("+") || rawText.includes("next")) {
    return rawText.includes("next") ? rawText.replace("next day", "+1") : rawText.replace(/\s+days/, "");
  }
  return rawText;
};

const getCleanTime = (rawText: string): string => {
  return getCorrectedDay(rawText).replace(/^0/, "");
};

// TODO: Test this and modal block during search, figure out 'back to flight penguin', modal block, and delay in redirecting
