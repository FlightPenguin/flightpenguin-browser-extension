import {
  addDays,
  addHours,
  addMinutes,
  endOfHour,
  max,
  min,
  roundToNearestMinutes,
  startOfDay,
  startOfHour,
} from "date-fns";

import { getParsedDate } from "../../../../../components/utilities/forms";
import { FlightSearchFormData } from "../../../../../shared/types/FlightSearchFormData";
import { Trip } from "../../../../../shared/types/Trip";
import { DisplayableTripInputPrimitive } from "../types";

export const getEarliestAndLatestTimes = (
  trips: DisplayableTripInputPrimitive[],
  formData: FlightSearchFormData,
  tripGroupIndex: number,
): { earliestTime: Date; latestTime: Date } => {
  let earliestTime, latestTime;

  if (trips.length) {
    const [departureTimes, arrivalTimes] = trips.reduce(
      ([departureTimes, arrivalTimes], input) => {
        const trip = input.trip as Trip;
        departureTimes.push(trip.getDepartureDateTime());
        arrivalTimes.push(addMinutes(trip.getDepartureDateTime(), trip.getDurationMinutes()));
        return [departureTimes, arrivalTimes];
      },
      [[] as Date[], [] as Date[]],
    );
    earliestTime = startOfHour(min(departureTimes));
    latestTime = roundToNearestMinutes(endOfHour(max(arrivalTimes)));
  } else {
    earliestTime = getEarliestTimeDefault(formData, tripGroupIndex);
    latestTime = addDays(earliestTime, 1);
  }

  return { earliestTime: earliestTime.getHours() % 2 === 0 ? earliestTime : addHours(earliestTime, -1), latestTime };
};

export const getEarliestTimeDefault = (formData: FlightSearchFormData, tripGroupIndex: number): Date => {
  return startOfDay(getParsedDate(formData.roundtrip && tripGroupIndex === 1 ? formData.toDate : formData.fromDate));
};
