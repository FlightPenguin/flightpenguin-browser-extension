import { Flight } from "../types/Flight";

interface GetFareProps {
  flight: Flight;
}

export const getFare = ({ flight }: GetFareProps): string | null => {
  let fare = flight.fareProducts?.ADULT?.WGA?.fare?.totalFare?.value;
  fare = fare || flight.fareProducts?.ADULT?.ANY?.fare?.totalFare?.value;
  fare = fare || flight.fareProducts?.ADULT?.BUS?.fare?.totalFare?.value;

  if (!fare) {
    return null;
  }
  return Math.ceil(Number(fare)).toString();
};
