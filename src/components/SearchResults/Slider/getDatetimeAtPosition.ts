import { addHours, addMinutes, format } from "date-fns";

import { flightTimeContainerWidth } from "../../constants";
import { getPixelsPerMinute } from "../../utilities/position/getPixelsPerMinute";
import { thumbWidthWrapperValue } from "./constants";

interface GetDatetimeAtPositionProps {
  startDate: Date;
  rawPosition: string;
  intervals: number[];
  width: number;
  thumbIndex: number;
}

export const getDatetimeAtPosition = ({
  startDate,
  rawPosition,
  intervals,
  width,
  thumbIndex,
}: GetDatetimeAtPositionProps): { formattedDate: string; formattedTime: string; datetime: Date } => {
  const position = getPositionFromPixelStatement(rawPosition);
  const pixelsPerMinute = getPixelsPerMinute({
    intervalCount: intervals.length,
    increment: getIncrement(intervals),
    width,
  });
  const adjustedPosition = getAdjustedPosition(position, thumbIndex);

  const minutes = adjustedPosition / pixelsPerMinute;
  const datetime = addMinutes(addHours(startDate, intervals[0]), minutes);
  const formattedDatetime = format(datetime, "MM/dd/yyyy h:mmaaa");
  const formattedDatetimeTokens = formattedDatetime.split(/\s+/);

  return { formattedDate: formattedDatetimeTokens[0], formattedTime: formattedDatetimeTokens[1], datetime };
};

const getIncrement = (intervals: number[]): number => {
  if (!intervals.length) {
    return 0;
  }
  return intervals[1] - intervals[0];
};

const getAdjustedPosition = (position: number, thumbIndex: number): number => {
  let adjustmentValue = 0;
  if (thumbIndex === 1) {
    adjustmentValue += thumbWidthWrapperValue;
  }
  if (adjustmentValue > flightTimeContainerWidth) {
    adjustmentValue = flightTimeContainerWidth;
  }
  return position + adjustmentValue;
};

const getPositionFromPixelStatement = (position: string): number => {
  return Number(position.split("px")[0]);
};
