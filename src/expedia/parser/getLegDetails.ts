import { MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { isOvernight } from "../../utilityFunctions";

export const getLegDetails = (leg: Element, legIndex: number, previousLegDetails?: FlightLeg): FlightLeg => {
  const [departure, details, arrival] = leg.children;

  let departureTime = getDepartureTime(departure);
  let arrivalTime = getArrivalTime(arrival);

  if (legIndex > 0 && isOvernight(previousLegDetails?.toTime, departureTime)) {
    departureTime += "+1"; // layover went to the next day
  } else if (isOvernight(departureTime, arrivalTime)) {
    arrivalTime += "+1"; // overnight flight
  }

  return {
    fromTime: departureTime,
    toTime: arrivalTime,
    from: getDepartureAirport(departure),
    to: getArrivalAirport(arrival),
    operatingAirline: getOperatingAirline(details?.children[1]),
    duration: getDuration(details?.children[0]),
  };
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
    airportCode = arrival.textContent?.split("-")[1]; // no airport, just listing the city
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
    airportCode = departure.textContent?.split("-")[1]; // no airport, just listing the city
  }

  if (!airportCode) {
    throw new MissingFieldParserError("Unable to determine departure airport for layover");
  }
  return airportCode;
};

const getDuration = (element: Element) => {
  const duration = element?.textContent?.replace("flight", "");

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
