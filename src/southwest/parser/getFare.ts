import { MissingFieldParserError } from "../../shared/errors";
import { Flight } from "../types/Flight";

interface GetFareProps {
  flight: Flight;
}

export const getFare = ({ flight }: GetFareProps): string => {
  let fare = flight.fareProducts?.ADULT?.WGA?.fare?.totalFare?.value;
  fare = fare || flight.fareProducts?.ADULT?.ANY?.fare?.totalFare?.value;
  fare = fare || flight.fareProducts?.ADULT?.BUS?.fare?.totalFare?.value;

  if (!fare) {
    throw new MissingFieldParserError("Unable to extract fare");
  }
  return Math.floor(Number(fare)).toString();
};
