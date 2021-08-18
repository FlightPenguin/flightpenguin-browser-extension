import { ParserError } from "../../shared/errors";
import AirlineMap from "../../shared/nameMaps/airlineMap.js";

const AIRLINE_NAME_REGEX = /^(?<Airline>[A-Za-z ]*)\s*(?<Flight>[Ff]light)\s*(?<Number>\d*)$/;

export const getParsedAirlineName = (flightName: string): string => {
  const result = flightName.match(AIRLINE_NAME_REGEX)?.groups?.Airline?.trim();
  if (!result) {
    throw new ParserError(`Unable to extract airline name from ${flightName}`);
  }

  const fullName = AirlineMap.getAirlineName(result);
  if (!fullName) {
    throw new ParserError("Unable to extract airline name from airline map");
  }

  return fullName;
};
