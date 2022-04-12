import { addYears, parse } from "date-fns";

import { MissingElementLookupError, MissingFieldParserError, ParserError } from "../../../../../shared/errors";
import { getFlightDateFromTimeString } from "../../../../../shared/parser/getFlightDateFromTimeString";

const TIME_SELECTOR = "span[class*='time']";
const DATE_SELECTOR = "span[class*='date-warning-badge']";

export const getFlightTime = (segmentContainer: HTMLDivElement, flightDate: Date): Date => {
  const correctFlightDate = getFlightDate(segmentContainer, flightDate);
  const time = getTime(segmentContainer);
  return getFlightDateFromTimeString(time, correctFlightDate);
};

const getFlightDate = (segmentContainer: HTMLDivElement, flightDate: Date): Date => {
  const dateElement = segmentContainer.querySelector(DATE_SELECTOR);
  if (dateElement) {
    // the flight date changed due to something happening overnight, e.g. layover, long flight
    const rawText = dateElement.textContent;
    if (!rawText) {
      throw new MissingFieldParserError("Unable to extract warning date text");
    }
    if (!rawText.includes(",")) {
      throw new ParserError("Unable to process warning date text");
    }

    const rawDate = rawText.split(",")[1].trim();
    let correctedDate = parse(rawDate, "MMM dd", new Date());
    if (correctedDate.valueOf() < flightDate.valueOf()) {
      correctedDate = addYears(correctedDate, 1);
    }
    flightDate = correctedDate;
  }

  return flightDate;
};

const getTime = (segmentContainer: HTMLDivElement): string => {
  const timeElement = segmentContainer.querySelector(TIME_SELECTOR);
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to find flight time");
  }

  const rawText = timeElement.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract flight time");
  }

  return rawText.replace(/\s+/g, "");
};
