import uniqBy from "lodash.uniqby";

import { DisplayableTrip } from "../../../shared/types/newtypes/DisplayableTrip";
import { Itinerary } from "../../../shared/types/newtypes/Itinerary";
import { SearchTripMeta } from "../../../shared/types/SearchMeta";

export const getTripsAndMetadata = (
  itineraries: Itinerary[],
  containerNumber: number,
  tripsSelectionId: string,
): { displayableTrips: DisplayableTrip[]; meta: SearchTripMeta } => {
  const displayableTrips = uniqBy(
    itineraries
      .filter((itinerary) => {
        return itinerary.getTrips().length >= containerNumber && itinerary.getId().startsWith(tripsSelectionId);
      })
      .map((itinerary) => {
        const lowestFare = itinerary.getTopSource().getFare();
        const tripIndex = containerNumber - 1;
        const trip = itinerary.getTrips()[tripIndex];
        return new DisplayableTrip({ lowestFare, trip });
      }),
    (trip) => {
      trip.getTrip().getId();
    },
  );

  const [carriers, layoverCounts, airports] = displayableTrips.reduce(
    ([carriers, layoverCounts, airports], trip) => {
      trip
        .getTrip()
        .getCarriers()
        .forEach((carrier) => {
          if (!carriers.includes(carrier)) {
            carriers.push(carrier);
          }
        });

      const layoverCount = trip.getTrip().getLayoverCount();
      if (!layoverCounts.includes(layoverCount)) {
        layoverCounts.push(layoverCount);
      }

      trip
        .getTrip()
        .getLayoverAirportCodes()
        .forEach((airportCode) => {
          if (!airports.includes(airportCode)) {
            airports.push(airportCode);
          }
        });

      return [carriers, layoverCounts, airports];
    },
    [[] as string[], [] as number[], [] as string[]],
  );

  return {
    displayableTrips,
    meta: { airlines: carriers.sort(), airports: airports.sort(), layoverCounts: layoverCounts.sort() },
  };
};
