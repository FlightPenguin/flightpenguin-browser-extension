import {
  addHours,
  addMinutes,
  differenceInHours,
  endOfHour,
  max,
  min,
  roundToNearestMinutes,
  startOfHour,
} from "date-fns";

import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";

export const getIntervalInfo = (
  trips: DisplayableTrip[],
  tripContainerWidth: number,
): { earliestTime: Date; latestTime: Date; intervals: number[]; intervalWidth: number } => {
  const { earliestTime, latestTime } = getEarliestAndLatestTimes(trips);
  const increment = getIntervalIncrement(differenceInHours(latestTime, earliestTime));
  const { lowerBoundary, upperBoundary } = getBoundaryTimes(earliestTime, latestTime, increment);

  const { intervals } = getIntervals(lowerBoundary, upperBoundary, increment);
  const intervalWidth = tripContainerWidth / (intervals.length - 1);
  return {
    earliestTime: lowerBoundary,
    latestTime: upperBoundary,
    intervals,
    intervalWidth,
  };
};

const getEarliestAndLatestTimes = (trips: DisplayableTrip[]): { earliestTime: Date; latestTime: Date } => {
  const [departureTimes, arrivalTimes] = trips.reduce(
    ([departureTimes, arrivalTimes], trip) => {
      departureTimes.push(trip.getTrip().getDepartureDateTime());
      arrivalTimes.push(addMinutes(trip.getTrip().getDepartureDateTime(), trip.getTrip().getDurationMinutes()));
      return [departureTimes, arrivalTimes];
    },
    [[] as Date[], [] as Date[]],
  );
  const earliestTime = startOfHour(min(departureTimes));
  const latestTime = roundToNearestMinutes(endOfHour(max(arrivalTimes)));

  return { earliestTime: earliestTime.getHours() % 2 === 0 ? earliestTime : addHours(earliestTime, -1), latestTime };
};

const getIntervals = (earliestTime: Date, latestTime: Date, increment: number): { intervals: number[] } => {
  const hours = differenceInHours(latestTime, earliestTime);

  const intervals: number[] = [];
  let time = earliestTime.getHours();
  const upperBoundary = earliestTime.getHours() + hours;
  while (time <= upperBoundary) {
    intervals.push(time);
    time += increment;
  }
  return { intervals };
};

const getIntervalIncrement = (hours: number): number => {
  if (hours > 144) {
    return 12;
  } else if (hours > 72) {
    return 6;
  } else if (hours <= 24) {
    return 2;
  } else {
    return 4;
  }
};

const getBoundaryTimes = (
  earliestTime: Date,
  latestTime: Date,
  increment: number,
): { lowerBoundary: Date; upperBoundary: Date } => {
  const lowerBoundary = addHours(earliestTime, increment * -1);
  const upperBoundary = addHours(latestTime, increment + (latestTime.getHours() % 2));
  return { lowerBoundary, upperBoundary };
};
