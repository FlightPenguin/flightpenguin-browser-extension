import { addDays, parse } from "date-fns";

import { getParsedDate } from "../../components/utilities/forms";

export const getFlightDateFromTimeString = (rawDate: string, flightDate: Date | string): Date => {
  if (flightDate.constructor.name === "String") {
    flightDate = getParsedDate(flightDate);
  }

  const indicator = rawDate.includes("-") ? "-" : "+";
  const [rawClock, excessDays] = rawDate.split(indicator);
  let flightTime = parse(rawClock, "hh:mmaaaa", flightDate as Date);
  if (excessDays) {
    const multiplier = indicator === "-" ? -1 : 1;
    flightTime = addDays(flightTime, Number(excessDays) * multiplier);
  }
  return flightTime;
};
