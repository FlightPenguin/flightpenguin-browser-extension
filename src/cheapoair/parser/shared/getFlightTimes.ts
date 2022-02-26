import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

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
    departureTime: dTimeElement.textContent.toLowerCase().replace("next day", "+1"),
    arrivalTime: aTimeElement.textContent.toLowerCase().replace("next day", "+1"),
  };
};
