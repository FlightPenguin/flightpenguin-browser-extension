import { MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getTimeDetails } from "../../utilityFunctions";

export const getLegDetails = (leg: Element, legIndex: number, previousLegDetails?: FlightLeg): FlightLeg => {
  const [departure, details, arrival] = leg.children;

  let departureTime = getDepartureTime(departure); // 9am
  let arrivalTime = getArrivalTime(arrival);

  if (isFlightOvernight(departureTime, arrivalTime)) {
    arrivalTime += "+1";
  }

  if (!!previousLegDetails && isLayoverOvernight(previousLegDetails, departureTime)) {
    departureTime += "+1";
  }

  return new FlightLeg({
    fromTime: departureTime,
    toTime: arrivalTime,
    from: getDepartureAirport(departure),
    to: getArrivalAirport(arrival),
    operatingAirline: getOperatingAirline(details?.children[1]),
    duration: getDuration(details?.children[0]),
  });
};

const getArrivalTime = (arrival: Element) => {
  const time = arrival.textContent?.split(" - ")[0].toLowerCase().replace("arrival", "");

  if (!time) {
    throw new MissingFieldParserError("Unable to determine arrival time for layover");
  }
  return standardizeTimeString(time);
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

const isFlightOvernight = (fromTime: string, toTime: string): boolean => {
  const fromTimeDetails = getTimeDetails(fromTime);
  const toTimeDetails = getTimeDetails(toTime);

  return (
    toTimeDetails.hours % 24 < fromTimeDetails.hours % 24 ||
    (toTimeDetails.hours % 24 === fromTimeDetails.hours % 24 && toTimeDetails.minutes <= fromTimeDetails.minutes)
  );
};

const isLayoverOvernight = (previousLegDetails: FlightLeg, fromTime: string): boolean => {
  const fromTimeDetails = getTimeDetails(fromTime);
  return previousLegDetails.toTimeDetails.hours % 24 > fromTimeDetails.hours % 24;
};
