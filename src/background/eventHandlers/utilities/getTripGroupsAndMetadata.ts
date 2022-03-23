import range from "lodash.range";
import uniqBy from "lodash.uniqby";

import { DisplayableTrip } from "../../../shared/types/newtypes/DisplayableTrip";
import { Itinerary } from "../../../shared/types/newtypes/Itinerary";
import { SearchTripMeta, SearchTripMetaDefault } from "../../../shared/types/SearchMeta";

export const getTripGroupsAndMeta = (
  itineraries: Itinerary[],
  tripsSelections: DisplayableTrip[],
  expectedArrayLength: number,
): { tripGroups: DisplayableTrip[][]; meta: SearchTripMeta[] } => {
  const tripGroups = range(1, expectedArrayLength + 1).map((num) => {
    return [] as DisplayableTrip[];
  });
  const metas = range(1, expectedArrayLength + 1).map((num) => {
    return SearchTripMetaDefault;
  });

  itineraries.forEach((itinerary) => {
    const highestMatchedIndex = itinerary.getMaxIndexMatch(tripsSelections);
    if (highestMatchedIndex !== undefined && highestMatchedIndex !== null && !isNaN(highestMatchedIndex)) {
      const lowestFare = itinerary.getTopSource().getFare();
      const trips = itinerary.getTrips().slice(0, highestMatchedIndex + 1);
      trips.forEach((trip, index) => {
        const tripGroup = tripGroups[index];
        const meta = metas[index];

        const displayableTrip = new DisplayableTrip({ trip, lowestFare, itineraryPainScore: itinerary.getPain() });
        tripGroup.push(displayableTrip);

        trip.getCarriers().forEach((carrier) => {
          if (!meta.airlines.includes(carrier)) {
            meta.airlines.push(carrier);
          }
        });

        trip.getLayoverAirportCodes().forEach((code) => {
          if (!meta.airports.includes(code)) {
            meta.airports.push(code);
          }
        });

        if (!meta.layoverCounts.includes(trip.getLayoverCount())) {
          meta.layoverCounts.push(trip.getLayoverCount());
        }
      });
    }
  });

  return {
    tripGroups: tripGroups.map((tripGroup) => {
      const sortedTripGroup = tripGroup.sort((a: DisplayableTrip, b: DisplayableTrip) => {
        return a.getTrip().getId() === b.getTrip().getId()
          ? a.getLowestFare() - b.getLowestFare()
          : a.getTrip().getId().localeCompare(b.getTrip().getId());
      });
      return uniqBy(sortedTripGroup, (trip) => {
        return trip.getTrip().getId();
      });
    }),
    meta: metas.map((meta) => {
      return {
        airlines: meta.airlines.sort(),
        airports: meta.airports.sort(),
        layoverCounts: meta.layoverCounts.sort((a, b) => {
          return a - b;
        }),
      };
    }),
  };
};
