import range from "lodash.range";

import { DisplayableTrip, DisplayableTripInput } from "../../../../shared/types/DisplayableTrip";
import { Itinerary } from "../../../../shared/types/Itinerary";
import { DisplayableTripInputPrimitive } from "./types";

export const getTripGroups = (
  itineraries: Itinerary[],
  tripsSelections: DisplayableTrip[],
  expectedArrayLength: number,
): DisplayableTripInputPrimitive[][] => {
  const tripGroups = range(1, expectedArrayLength + 1).map((num) => {
    return [] as DisplayableTripInputPrimitive[];
  });

  itineraries.forEach((itinerary) => {
    const highestMatchedIndex = itinerary.getMaxIndexMatch(tripsSelections);
    if (highestMatchedIndex !== undefined && highestMatchedIndex !== null && !isNaN(highestMatchedIndex)) {
      const lowestFare = itinerary.getTopSource().getFare();
      const trips = itinerary.getTrips().slice(0, highestMatchedIndex + 1);

      trips.forEach((trip, index) => {
        const tripGroup = tripGroups[index as number];
        tripGroup.push({ cabin: itinerary.getCabin(), lowestFare, trip });
      });
    }
  });

  return tripGroups;
};
