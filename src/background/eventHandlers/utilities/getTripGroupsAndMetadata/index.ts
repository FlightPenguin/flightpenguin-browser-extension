import uniqBy from "lodash.uniqby";

import { DisplayableTrip } from "../../../../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../../../shared/types/Itinerary";
import { SearchTripMeta } from "../../../../shared/types/SearchMeta";
import { getDisplayableTripGroups } from "./getDisplayableTripGroups";
import { getTimeInfo } from "./getTimeInfo";
import { getTripGroupMetadata } from "./getTripGroupMetadata";
import { getTripGroups } from "./getTripGroups";

export const getTripGroupsAndMetadata = (
  itineraries: Itinerary[],
  tripsSelections: DisplayableTrip[],
  expectedArrayLength: number,
  dominationDenyList: string[],
  formData: FlightSearchFormData,
): { tripGroups: DisplayableTrip[][]; meta: SearchTripMeta[] } => {
  const tripGroups = getTripGroups(itineraries, tripsSelections, expectedArrayLength);
  const tripGroupsTimeMetadata = getTimeInfo(tripGroups, formData);
  const displayableTripGroups = getDisplayableTripGroups(tripGroups, tripGroupsTimeMetadata, dominationDenyList);
  const metadata = displayableTripGroups.map((tripGroup, index) => {
    const timeMetadata = tripGroupsTimeMetadata[index as number];
    return getTripGroupMetadata(tripGroup, timeMetadata);
  });

  return {
    tripGroups: displayableTripGroups.map((tripGroup) => {
      const sortedTripGroup = tripGroup.sort((a: DisplayableTrip, b: DisplayableTrip) => {
        return a.getTrip().getId() === b.getTrip().getId()
          ? a.getLowestFare() - b.getLowestFare()
          : a.getTrip().getId().localeCompare(b.getTrip().getId());
      });
      return uniqBy(sortedTripGroup, (trip) => {
        return trip.getTrip().getId();
      }).map((displayableTrip) => {
        return displayableTrip;
      });
    }),
    meta: metadata,
  };
};
