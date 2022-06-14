import { addHours, addMinutes, addYears, parse, startOfDay } from "date-fns";

import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

const FLIGHT_TIME_SELECTOR = "time[class*='is--flight-time']";
const FLIGHT_DAY_SELECTOR = "span[class*='is--flight-month']";

export const getFlightTimes = (
  flightContainer: HTMLDivElement,
  previousLegDepartureDate: Date,
): { departureDateTime: Date; arrivalDateTime: Date } => {
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

  const dateElements = flightContainer.querySelectorAll(FLIGHT_DAY_SELECTOR);
  if (!dateElements || dateElements.length !== 2) {
    throw new MissingElementLookupError("Unable to retrieve flight details dates");
  }

  const [dDateElement, aDateElement] = dateElements;
  if (!dDateElement.textContent) {
    throw new MissingFieldParserError("Unable to extract departure time text");
  }
  if (!aDateElement.textContent) {
    throw new MissingFieldParserError("Unable to extract departure time text");
  }

  const departureDateTime = getFlightDateTime(
    dDateElement.textContent,
    dTimeElement.textContent,
    previousLegDepartureDate,
  );
  const arrivalDateTime = getFlightDateTime(aDateElement.textContent, aTimeElement.textContent, departureDateTime);

  return {
    arrivalDateTime,
    departureDateTime,
  };
};

const getFlightDateTime = (flightDateText: string, flightTimeText: string, previousFlightDate: Date): Date => {
  let flightDate = parse(flightDateText, "MMM dd", new Date());
  if (flightDate < startOfDay(previousFlightDate)) {
    flightDate = addYears(previousFlightDate, 1);
  }

  const [hoursText, restOfText] = flightTimeText.split(":");
  const [minutesText, garbage] = restOfText.split(/[a|p]m/i);
  let hours = Number(hoursText);
  if (restOfText.toLowerCase().includes("pm") && hours !== 12) {
    hours += 12;
  } else if (restOfText.toLowerCase().includes("am") && hours === 12) {
    hours = 0;
  }

  return addMinutes(addHours(flightDate, Number(hours)), Number(minutesText));
};
