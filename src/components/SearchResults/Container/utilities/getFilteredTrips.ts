import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";

interface GetFilteredTripsInput {
  displayTrips: DisplayableTrip[];
  filterProperties: {
    dateRange: { lowerBound: Date | null; upperBound: Date | null };
    layoverCount: number[] | undefined;
    carriers: string[] | undefined;
    layoverCities: string[] | undefined;
  };
}

export const getFilteredTrips = ({ displayTrips, filterProperties }: GetFilteredTripsInput): DisplayableTrip[] => {
  return displayTrips.filter((dTrip) => {
    const trip = dTrip.getTrip();

    return (
      trip.isArrivingBeforeTime(filterProperties.dateRange.upperBound) &&
      trip.isDepartingAfterTime(filterProperties.dateRange.lowerBound) &&
      trip.isLayoverCountInRange(filterProperties.layoverCount) &&
      trip.isLayoverInCity(filterProperties.layoverCities) &&
      trip.isFlownByCarriers(filterProperties.carriers)
    );
  });
};
