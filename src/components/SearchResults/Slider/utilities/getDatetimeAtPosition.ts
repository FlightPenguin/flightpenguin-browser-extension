import { addHours, addMinutes, format, roundToNearestMinutes } from "date-fns";
import Decimal from "decimal.js-light";

import { flightTimeContainerWidth } from "../../../constants";
import { getPixelsPerMinute } from "../../../utilities/position/getPixelsPerMinute";
import { thumbWidthWrapperValue } from "../constants";
import { getIncrement } from "./getIncrement";

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
}: GetDatetimeAtPositionProps): {
  formattedDate: string;
  formattedTime: string;
  realDatetime: Date;
  roundedDatetime: Date; // rounded to nearest 15m
} => {
  const position = getPositionFromPixelStatement(rawPosition);
  const pixelsPerMinute = getPixelsPerMinute({
    intervalCount: intervals.length,
    increment: getIncrement(intervals),
    width,
  });
  const adjustedPosition = getAdjustedPosition(position, thumbIndex);

  const minutes = adjustedPosition.dividedBy(pixelsPerMinute).toDecimalPlaces(0).toNumber();
  const datetime = addMinutes(addHours(startDate, intervals[0]), minutes);
  const roundedDatetime = roundToNearestMinutes(datetime, { nearestTo: 15 });
  console.log(datetime);
  console.log(roundedDatetime);
  const formattedDatetime = format(roundedDatetime, "MM/dd/yyyy h:mmaaa");
  const formattedDatetimeTokens = formattedDatetime.split(/\s+/);

  return {
    formattedDate: formattedDatetimeTokens[0],
    formattedTime: formattedDatetimeTokens[1],
    realDatetime: datetime,
    roundedDatetime,
  };
};

const getAdjustedPosition = (position: Decimal, thumbIndex: number): Decimal => {
  let adjustmentValue = 0;
  if (thumbIndex === 1) {
    adjustmentValue += thumbWidthWrapperValue;
  }
  if (adjustmentValue > flightTimeContainerWidth) {
    adjustmentValue = flightTimeContainerWidth;
  }
  return position.plus(adjustmentValue);
};

const getPositionFromPixelStatement = (position: string): Decimal => {
  return new Decimal(position.split("px")[0]).toDecimalPlaces(2);
};
