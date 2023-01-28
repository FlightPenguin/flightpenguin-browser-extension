import { differenceInMinutes } from "date-fns";
import range from "lodash.range";

import { DisplayableTrip } from "../../../../shared/types/DisplayableTrip";
import { TripGroupTimeMetadata } from "./getTimeInfo/TripGroupTimeMetadata";
import { DisplayableTripInputPrimitive } from "./types";

export const getDisplayableTripGroups = (
  tripGroups: DisplayableTripInputPrimitive[][],
  tripGroupsTimeMetadata: TripGroupTimeMetadata[],
  dominationDenyList: string[],
): DisplayableTrip[][] => {
  const displayableTripGroups = range(1, tripGroups.length + 1).map((num) => {
    return [] as DisplayableTrip[];
  });

  tripGroups.forEach((tripGroup, index) => {
    const timeInfo = tripGroupsTimeMetadata[index as number];
    const containerMinutes = differenceInMinutes(timeInfo.latestTime, timeInfo.earliestTime);

    const displayableTripGroup = displayableTripGroups[index as number];
    tripGroup.forEach((tripInputPrimitive) => {
      const displayableTrip = new DisplayableTrip({
        ...tripInputPrimitive,
        containerInfo: {
          earliestTime: timeInfo.earliestTime,
          latestTime: timeInfo.latestTime,
          differenceInMinutes: containerMinutes,
        },
      });
      if (displayableTrip.getPain()) {
        const betterTrip = displayableTripGroup.find((existingTrip) =>
          existingTrip.isDominatableByTrip(displayableTrip),
        );
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

        displayableTripGroup.push(displayableTrip);
      } else {
        const msg = `Zero pain for flight from ${displayableTrip
          .getTrip()
          .getDepartureLocation()
          .getCode()} on ${displayableTrip.getTrip().getDepartureDateTime()} to ${displayableTrip
          .getTrip()
          .getArrivalLocation()
          .getCode()}  on ${displayableTrip.getTrip().getArrivalDateTime()}`;
        console.error(msg);
        return;
      }
    });
  });

  return displayableTripGroups;
};
