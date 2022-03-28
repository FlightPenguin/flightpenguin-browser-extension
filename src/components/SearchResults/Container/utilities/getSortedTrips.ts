import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";
import { TripSortDimension } from "../../../constants";

interface GetSortedFlightsProps {
  trips: DisplayableTrip[];
  dimension: TripSortDimension;
}

export const getSortedTrips = ({ trips, dimension }: GetSortedFlightsProps): DisplayableTrip[] => {
  return trips.sort((a, b) => {
    return getSortValue(a, b, dimension);
  });
};

const getSortValue = (a: DisplayableTrip, b: DisplayableTrip, dimension: TripSortDimension): number => {
  switch (dimension) {
    case "ata":
      return a.getTrip().getArrivalDateTime().valueOf() - b.getTrip().getArrivalDateTime().valueOf();
    case "atd":
      return b.getTrip().getArrivalDateTime().valueOf() - a.getTrip().getArrivalDateTime().valueOf();
    case "dta":
      return a.getTrip().getDepartureDateTime().valueOf() - b.getTrip().getDepartureDateTime().valueOf();
    case "dtd":
      return b.getTrip().getDepartureDateTime().valueOf() - a.getTrip().getDepartureDateTime().valueOf();
    case "duration":
      return a.getTrip().getDurationMinutes() - b.getTrip().getDurationMinutes();
    case "fare":
      return a.getLowestFare() - b.getLowestFare();
    case "pain":
      return a.getPain() - b.getPain();
  }
};
