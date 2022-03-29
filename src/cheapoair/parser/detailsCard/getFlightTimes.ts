import { addYears, differenceInCalendarDays, parse, startOfDay } from "date-fns";

import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const FLIGHT_TIME_SELECTOR = "time[class*='is--flight-time']";
const FLIGHT_DAY_SELECTOR = "span[class*='is--flight-month']";

export const getFlightTimes = (
  flightContainer: HTMLDivElement,
  previousLegDepartureDate: Date,
): { departureTime: string; arrivalTime: string; departureDate: Date } => {
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

  const departureDate = getDepartureDate(flightContainer, previousLegDepartureDate);
  const departureTimeDifference = getDateDifference(previousLegDepartureDate, departureDate);

  const departureTime = getCorrectedDay(dTimeElement.textContent.toLowerCase(), departureTimeDifference);
  const arrivalTime = getCorrectedDay(aTimeElement.textContent.toLowerCase(), null);

  return {
    arrivalTime,
    departureDate,
    departureTime,
  };
};

const getCorrectedDay = (rawText: string, dateDifference: number | null): string => {
  let correctedText = rawText;
  if (dateDifference) {
    const indicator = dateDifference < 0 ? "-" : "+";
    correctedText = `${correctedText}${indicator}${Math.abs(dateDifference)}`;
  } else {
    if (rawText.includes("+") || rawText.includes("next")) {
      correctedText = rawText.includes("next") ? rawText.replace("next day", "+1") : rawText.replace(/\s+days/, "");
    }
  }

  return correctedText.replace(/^0/, "");
};

const getDepartureDate = (flightContainer: HTMLDivElement, previousDepartureDate: Date): Date => {
  // NOTE: Returns date with midnight as time always!
  const departureDateElement = flightContainer.querySelector(FLIGHT_DAY_SELECTOR) as HTMLSpanElement;
  if (!departureDateElement) {
    throw new MissingElementLookupError("Unable to find flight leg departure date");
  }

  if (!departureDateElement.textContent) {
    throw new MissingFieldParserError("Unable to extract text fromf light leg departure date element");
  }

  let departureDate = parse(departureDateElement.textContent, "MMM dd", new Date());
  if (startOfDay(departureDate) < startOfDay(previousDepartureDate)) {
    departureDate = addYears(departureDate, 1);
  }
  return departureDate;
};

const getDateDifference = (previousDepartureDate: Date, departureDate: Date): number => {
  return differenceInCalendarDays(departureDate, previousDepartureDate);
};
