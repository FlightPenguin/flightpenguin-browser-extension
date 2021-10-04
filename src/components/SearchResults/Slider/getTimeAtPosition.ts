import { addHours, addMinutes, format } from "date-fns";

import { getPixelsPerMinute } from "../../utilities/position/getPixelsPerMinute";

interface GetDatetimeAtPositionProps {
  startDate: Date;
  position: number;
  intervals: number[];
  width: number;
}

export const getDatetimeAtPosition = ({
  startDate,
  position,
  intervals,
  width,
}: GetDatetimeAtPositionProps): { formattedDate: string; formattedTime: string; datetime: Date } => {
  const pixelsPerMinute = getPixelsPerMinute({
    intervalCount: intervals.length,
    increment: getIncrement(intervals),
    width,
  });

  console.log(width);
  console.log(intervals);
  console.log(pixelsPerMinute);

  const minutes = position / pixelsPerMinute;
  const datetime = addMinutes(addHours(startDate, intervals[0]), minutes);
  const formattedDatetime = format(datetime, "MM/dd/yyyy hh:mmaaa");
  const formattedDatetimeTokens = formattedDatetime.split(/\s+/);

  return { formattedDate: formattedDatetimeTokens[0], formattedTime: formattedDatetimeTokens[1], datetime };
};

const getIncrement = (intervals: number[]): number => {
  if (!intervals.length) {
    return 0;
  }
  return intervals[1] - intervals[0];
};
