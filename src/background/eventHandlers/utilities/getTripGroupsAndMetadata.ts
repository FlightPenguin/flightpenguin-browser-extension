import range from "lodash.range";
import uniqBy from "lodash.uniqby";

import { DisplayableTrip } from "../../../shared/types/DisplayableTrip";
import { Itinerary } from "../../../shared/types/Itinerary";
import { SearchTripMeta } from "../../../shared/types/SearchMeta";

export const getTripGroupsAndMeta = (
  itineraries: Itinerary[],
  tripsSelections: DisplayableTrip[],
  expectedArrayLength: number,
  dominationDenyList: string[],
): { tripGroups: DisplayableTrip[][]; meta: SearchTripMeta[] } => {
  const tripGroups = range(1, expectedArrayLength + 1).map((num) => {
    return [] as DisplayableTrip[];
  });

  itineraries.forEach((itinerary) => {
    const highestMatchedIndex = itinerary.getMaxIndexMatch(tripsSelections);
    if (highestMatchedIndex !== undefined && highestMatchedIndex !== null && !isNaN(highestMatchedIndex)) {
      const lowestFare = itinerary.getTopSource().getFare();
      const trips = itinerary.getTrips().slice(0, highestMatchedIndex + 1);
      trips.forEach((trip, index) => {
        const tripGroup = tripGroups[index];

        const displayableTrip = new DisplayableTrip({ trip, lowestFare, cabin: itinerary.getCabin() });
        if (displayableTrip.getPain()) {
          const betterTrip = tripGroup.find((existingTrip) => existingTrip.isDominatableByTrip(displayableTrip));
          if (betterTrip) {
            if (!dominationDenyList.includes(betterTrip.getTrip().getId())) {
              betterTrip.getDominatedTripIds().forEach((dominatedTrip) => {
                betterTrip.addDominatedTripId(dominatedTrip);
              });
              displayableTrip.resetDominatedTripIds();
              betterTrip.addDominatedTripId(displayableTrip.getTrip().getId());
              return;
            }
          }

          tripGroup.push(displayableTrip);
        } else {
          sendZeroPainMessageToSentry(displayableTrip, itinerary);
          return;
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
    meta: tripGroups.map((tripGroup) => {
      return getTripGroupMetadata(tripGroup);
    }),
  };
};

const sendZeroPainMessageToSentry = (trip: DisplayableTrip, itinerary: Itinerary): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.addBreadcrumb({
    category: "backend",
    message: `Zero pain for flight from ${trip.getTrip().getDepartureLocation().getCode()} on ${trip
      .getTrip()
      .getDepartureDateTime()} to ${trip.getTrip().getArrivalLocation().getCode()}  on ${trip
      .getTrip()
      .getArrivalDateTime()} with source ${itinerary.getTopSource().getName()}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    level: window.Sentry.Severity.Info,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureMessage("Trip without pain");
};

const getTripGroupMetadata = (tripGroup: DisplayableTrip[]): SearchTripMeta => {
  const [airlines, airports, layoverCounts] = tripGroup.reduce(
    ([airlines, airports, layoverCounts], trip) => {
      airlines.push(trip.getTrip().getCarriers());
      airports.push(trip.getTrip().getLayoverAirportCodes());
      layoverCounts.push(trip.getTrip().getLayoverCount());
      return [airlines, airports, layoverCounts];
    },
    [[] as string[][], [] as string[][], [] as number[]],
  );

  return {
    airlines: Array.from(new Set(airlines.flat())).sort(),
    airports: Array.from(new Set(airports.flat())).sort(),
    layoverCounts: Array.from(new Set(layoverCounts.flat())).sort((a, b) => {
      return a - b;
    }),
  };
};
