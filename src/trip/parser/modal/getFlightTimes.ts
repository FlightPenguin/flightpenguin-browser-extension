import { addYears, differenceInDays, parse } from "date-fns";

import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";
import { getFormatted12HourClockTimeFrom24HourClockTime } from "../../../shared/utilities/getFormatted12HourClockTimeFrom24HourClockTime";

const FLIGHT_TIME_CONTAINER_SELECTOR = "div.f-flight-detail__times";
const NEXT_DAY_SELECTOR = "span.date";
const TIME_SELECTOR = "span.time";

export const getFlightTimes = (
  container: HTMLDivElement,
  departureDate: Date,
): { arrivalTime: string; departureTime: string } => {
  const [departureTimeContainer, arrivalTimeContainer] = container.querySelectorAll(
    FLIGHT_TIME_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLDivElement>;

  if (!departureTimeContainer) {
    throw new MissingElementLookupError("Unable to find departure time container for layover");
  }

  if (!arrivalTimeContainer) {
    throw new MissingElementLookupError("Unable to find arrival time container for layover");
  }

  return {
    arrivalTime: getFormattedFlightTime(arrivalTimeContainer, departureDate),
    departureTime: getFormattedFlightTime(departureTimeContainer, departureDate),
  };
};

const getFormattedFlightTime = (container: HTMLDivElement, departureDate: Date): string => {
  const additionalDays = getAdditionalFlightDays(container, departureDate);
  const time = getFlightTime(container);
  return additionalDays ? `${time}+${additionalDays}` : `${time}`;
};

const getAdditionalFlightDays = (container: HTMLDivElement, departureDate: Date): number => {
  let additionalDays = 0;
  if (container.childElementCount >= 2) {
    const dateContainer = container.querySelector(NEXT_DAY_SELECTOR);
    if (!dateContainer) {
      throw new MissingElementLookupError("Unable to extract flight leg next date");
    }

    if (!dateContainer.textContent) {
      throw new MissingFieldParserError("Unable to extract flight leg next date string");
    }
    let flightDate = parse(dateContainer.textContent, "LLL d", new Date());
    if (flightDate < departureDate) {
      flightDate = addYears(flightDate, 1);
    }
    additionalDays = differenceInDays(flightDate, departureDate);
  }
  return additionalDays;
};

const getFlightTime = (container: HTMLDivElement): string => {
  const timeContainer = container.querySelector(TIME_SELECTOR);
  if (!timeContainer) {
    throw new MissingElementLookupError("Unable to extract flight leg flight time");
  }

  if (!timeContainer.textContent) {
    throw new MissingFieldParserError("Unable to extract flight leg next flight time");
  }

  const time = timeContainer.textContent.trim();
  return getFormatted12HourClockTimeFrom24HourClockTime(time);
};
