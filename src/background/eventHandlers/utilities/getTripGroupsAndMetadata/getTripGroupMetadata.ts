import { addMinutes } from "date-fns";

import { DisplayableTrip } from "../../../../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { SearchTripMeta } from "../../../../shared/types/SearchMeta";
import { NO_ALLIANCE } from "../../../constants";
import { getTimeInfo } from "./getTimeInfo";
import { TripGroupTimeMetadata } from "./getTimeInfo/TripGroupTimeMetadata";
// import { getEarliestAndLatestTimes } from "./getEarliestAndLatestTimes";

export const getTripGroupMetadata = (
  tripGroup: DisplayableTrip[],
  timeMetadata: TripGroupTimeMetadata,
): SearchTripMeta => {
  let airlineCount = 0;

  const [airlines, airports, layoverCounts] = tripGroup.reduce(
    ([airlines, airports, layoverCounts], trip) => {
      const carriers = trip.getTrip().getAirlines();
      carriers.forEach((carrier) => {
        const alliance = carrier.getAlliance() || NO_ALLIANCE;
        const airline = carrier.getName();
        if (Object.keys(airlines).includes(alliance)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line security/detect-object-injection
          const allianceData = airlines[alliance];
          if (!allianceData.includes(airline)) {
            allianceData.push(airline);
            airlineCount += 1;
          }
        } else {
          airlines[alliance] = [airline];
          airlineCount += 1;
        }
      });

      airports.push(trip.getTrip().getLayoverAirportCodes());
      layoverCounts.push(trip.getTrip().getLayoverCount());

      return [airlines, airports, layoverCounts];
    },
    [{} as { [keyof: string]: string[] }, [] as string[][], [] as number[]],
  );

  Object.keys(airlines).forEach((alliance) => {
    // eslint-disable-next-line security/detect-object-injection
    airlines[alliance] = airlines[alliance].sort();
  });

  return {
    ...timeMetadata,
    airlineCount: airlineCount,
    airlines: airlines,
    airports: Array.from(new Set(airports.flat())).sort(),
    layoverCounts: Array.from(new Set(layoverCounts.flat())).sort((a, b) => {
      return a - b;
    }),
  };
};
