import * as Sentry from "@sentry/browser";
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
        sendZeroPainMessageToSentry(displayableTrip);
        return;
      }
    });
  });

  return displayableTripGroups;
};

const sendZeroPainMessageToSentry = (trip: DisplayableTrip): void => {
  Sentry.addBreadcrumb({
    category: "backend",
    message: `Zero pain for flight from ${trip.getTrip().getDepartureLocation().getCode()} on ${trip
      .getTrip()
      .getDepartureDateTime()} to ${trip.getTrip().getArrivalLocation().getCode()}  on ${trip
      .getTrip()
      .getArrivalDateTime()}`,
    level: Sentry.Severity.Info,
  });
  Sentry.captureMessage("Trip without pain");
};
