import { addDays, addYears, parse } from "date-fns";

import { MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { getTimeDetails } from "../../utilityFunctions";

export const getLegDetails = (
  leg: Element,
  legIndex: number,
  formData: FlightSearchFormData,
  isReturn: boolean,
  elapsedTimezoneOffset: number,
  previousLegDetails?: FlightLeg,
): FlightLeg => {
  const originDate = isReturn ? formData.toDate : formData.fromDate;
  const legDepartureDate = getLegDepartureDate(previousLegDetails, originDate);

  const [departure, details, arrival] = leg.children;

  let departureTime = getDepartureTime(departure); // 9am
  let arrivalTime = getArrivalTime(arrival, legDepartureDate);

  if (!!previousLegDetails && isLayoverOvernight(previousLegDetails, departureTime)) {
    departureTime += "+1";
    if (arrivalTime.includes("+")) {
      const tokens = arrivalTime.split("+");
      const excessDays = Number(tokens[1]) - 1;
      arrivalTime = `${tokens[0]}+${excessDays}`;
    }
  }

  return new FlightLeg({
    fromTime: departureTime,
    toTime: arrivalTime,
    from: getDepartureAirport(departure),
    to: getArrivalAirport(arrival),
    operatingAirline: getOperatingAirline(details?.children[1]),
    duration: getDuration(details?.children[0]),
    elapsedTimezoneOffset,
  });
};

const getArrivalTime = (arrival: Element, legDepartureDate: Date): string => {
  let time = arrival.textContent?.split(" - ")[0].toLowerCase().replace("arrival", "");

  if (!time) {
    throw new MissingFieldParserError("Unable to determine arrival time for layover");
  }
  time = standardizeTimeString(time);

  if (arrival.textContent?.toLowerCase().includes("arrives")) {
    const rawArrivalDate = arrival.textContent
      .split(/Arrives/i)
      .slice(-1)[0]
      .trim();

    let arrivalDate = parse(rawArrivalDate, "EEE, MMM d", new Date());
    if (arrivalDate < legDepartureDate) {
      arrivalDate = addYears(arrivalDate, 1);
    }

    const dateDiff = Math.floor((arrivalDate.valueOf() - legDepartureDate.valueOf()) / 86400000);
    if (dateDiff) {
      time += `+${dateDiff}`;
    }
  }
  return time as string;
};

const getDepartureTime = (departure: Element) => {
  const time = departure.textContent?.split(" - ")[0].toLowerCase().replace("departure", "");

  if (!time) {
    throw new MissingFieldParserError("Unable to determine departure time for layover");
  }
  return standardizeTimeString(time);
};

const getArrivalAirport = (arrival: Element) => {
  let airportCode = arrival.textContent?.slice(
    arrival.textContent?.indexOf("(") + 1,
    arrival.textContent?.indexOf(")"),
  );
  if (airportCode?.length !== 3) {
    airportCode = arrival.textContent?.split("-")[1].split("Arrives")[0].trim(); // no airport, just listing the city
  }

  if (!airportCode) {
    throw new MissingFieldParserError("Unable to determine departure airport for layover");
  }
  return airportCode;
};

const getDepartureAirport = (departure: Element) => {
  let airportCode = departure.textContent?.slice(
    departure.textContent?.indexOf("(") + 1,
    departure.textContent?.indexOf(")"),
  );

  if (airportCode?.length !== 3) {
    airportCode = departure.textContent?.split("-")[1].split("Arrives")[0].trim(); // no airport, just listing the city
  }

  if (!airportCode) {
    throw new MissingFieldParserError("Unable to determine departure airport for layover");
  }
  return airportCode;
};

const getDuration = (element: Element) => {
  const duration = element?.textContent?.replace("flight", "").trim();

  if (!duration) {
    throw new MissingFieldParserError("Unable to determine duration time for layover");
  }
  return duration;
};

const getOperatingAirline = (element: Element) => {
  // for operating might have to find index of first digit, then consider string before it if extra string after flight num
  const airline = element?.textContent
    ?.match(/[A-z]*/g)
    ?.join(" ")
    .trim();

  if (!airline) {
    throw new MissingFieldParserError("Unable to determine operating airline for layover");
  }
  return airline;
};

const isLayoverOvernight = (previousLegDetails: FlightLeg, fromTime: string): boolean => {
  const fromTimeDetails = getTimeDetails(fromTime);
  return previousLegDetails.toTimeDetails.hours % 24 > fromTimeDetails.hours % 24;
};

const getLegDepartureDate = (previousLegDetails: FlightLeg | undefined, departureDate: string): Date => {
  const tripDepartureDate = parse(departureDate, "yyyy-MM-dd", new Date());
  if (!previousLegDetails) {
    return tripDepartureDate;
  }
  const excessDays = Number(previousLegDetails.toTimeDetails.excessDays || "0");
  return addDays(tripDepartureDate, excessDays);
};
