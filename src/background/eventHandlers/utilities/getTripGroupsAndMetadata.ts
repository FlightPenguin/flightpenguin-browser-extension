import range from "lodash.range";
import uniqBy from "lodash.uniqby";

import { DisplayableTrip } from "../../../shared/types/newtypes/DisplayableTrip";
import { Itinerary } from "../../../shared/types/newtypes/Itinerary";
import { SearchTripMeta, SearchTripMetaDefault } from "../../../shared/types/SearchMeta";

export const getTripGroupsAndMeta = (
  itineraries: Itinerary[],
  tripsSelections: DisplayableTrip[],
): { tripGroups: DisplayableTrip[][]; meta: SearchTripMeta[] } => {
  const containerNumber = tripsSelections.length;

  const tripGroups = range(1, containerNumber + 1).map((num) => {
    return [] as DisplayableTrip[];
  });
  const metas = range(1, containerNumber + 1).map((num) => {
    return SearchTripMetaDefault;
  });

  itineraries.forEach((itinerary) => {
    const highestMatchedIndex = itinerary.getMaxIndexMatch(tripsSelections);
    if (highestMatchedIndex) {
      const lowestFare = itinerary.getTopSource().getFare();
      const trips = itinerary.getTrips().slice(0, highestMatchedIndex);
      trips.forEach((trip, index) => {
        const tripGroup = tripGroups[index];
        const meta = metas[index];

        const displayableTrip = new DisplayableTrip({ trip, lowestFare });
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
      return uniqBy(tripGroup, (trip) => {
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
