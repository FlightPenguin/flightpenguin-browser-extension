import { getElapsedTime } from "../../../../../shared/utilities/getElapsedTime";
import { getPixelsPerMinute } from "../../../../utilities/position/getPixelsPerMinute";

interface GetPositionProps {
  fromTime: string;
  toTime: string;
  startDayOffset: number;
  endDayOffset: number;
  increment: number;
  startHourOffset: number;
  intervalCount: number;
  containerWidth: number;
}

export function getPosition({
  fromTime,
  toTime,
  startDayOffset,
  endDayOffset,
  increment,
  startHourOffset,
  intervalCount,
  containerWidth,
}: GetPositionProps): { width: number; startX: number } {
  /**
   * Basically this is what's happening here:
   * Intervals for 24 hours
   * [12am, 6am, 12pm, 6pm, 12am]
   * [0px, 100px, 200px, 300px, 400px]
   * If we want the whole thing to be 400 px, 400 px / 24 hours = 33.33 px/hr
   * So 6:05am would be (33.33 * 6) + (5 * 33.33/60) = start position in pixels
   * width = end position in pixels - start position in pixels
   */
  const pxPerMinute = getPixelsPerMinute({ intervalCount, increment, width: containerWidth });
  const minutesPerHour = 60;
  const minutesPerDay = minutesPerHour * 24;
  const positionAtMidnight = pxPerMinute.times(minutesPerDay);

  const startMinutesOffset = startDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight starts on a following day, happens with layovers
  const endMinutesOffset = endDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight ends on a following day, happens with long distance flights and layovers

  const fromTimeAttrs = getElapsedTime(fromTime, false);
  const startTimeInMinutes = startMinutesOffset + fromTimeAttrs.minutes + fromTimeAttrs.hours * minutesPerHour;

  const toTimeAttrs = getElapsedTime(toTime, false);
  const endTimeInMinutes = endMinutesOffset + toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;

  const startPositionPx = pxPerMinute.times(startTimeInMinutes);
  let endPositionPx = pxPerMinute.times(endTimeInMinutes);

  if (endPositionPx.toNumber() < startPositionPx.toNumber()) {
    endPositionPx = endPositionPx.plus(positionAtMidnight);
  }

  const timeBarWidth = endPositionPx.minus(startPositionPx);
  return { width: timeBarWidth.toDecimalPlaces(2).toNumber(), startX: startPositionPx.toDecimalPlaces(2).toNumber() };
}
