import { getIncrement } from "./getIncrement";
import { getIntervals } from "./getIntervals";

interface GetSkeletonIntervalInfoInput {
  flightTimeContainerWidth: number;
}

interface GetSkeletonIntervalInfoOutput {
  startHour: number;
  increment: number;
  intervals: number[];
  timezoneOffset: number;
}

export const getSkeletonIntervalInfo = ({
  flightTimeContainerWidth,
}: GetSkeletonIntervalInfoInput): GetSkeletonIntervalInfoOutput => {
  const startHour = 0;
  const endHour = 28;
  const timezoneOffset = 0;

  const increment = getIncrement({ lowerBound: startHour, upperBound: endHour, startHour, flightTimeContainerWidth });
  const intervals = getIntervals(startHour, increment, flightTimeContainerWidth, endHour);
  return { startHour, increment, intervals, timezoneOffset };
};
