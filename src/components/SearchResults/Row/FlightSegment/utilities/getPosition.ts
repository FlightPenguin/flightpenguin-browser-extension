import { convertTimeTo24HourClock } from "../../../../../utilityFunctions";

export function getPosition(
  fromTime: string,
  toTime: string,
  startDayOffset: number,
  endDayOffset: number,
  increment: number,
  startHourOffset: number,
  intervalCount: number,
  containerWidth: number,
): { width: number; startX: number } {
  /**
   * Basically this is what's happening here:
   * Intervals for 24 hours
   * [12am, 6am, 12pm, 6pm, 12am]
   * [0px, 100px, 200px, 300px, 400px]
   * If we want the whole thing to be 400 px, 400 px / 24 hours = 33.33 px/hr
   * So 6:05am would be (33.33 * 6) + (5 * 33.33/60) = start position in pixels
   * width = end position in pixels - start position in pixels
   */
  const totalHours = (intervalCount - 1) * increment;
  const totalMinutes = totalHours * 60;
  const pxPerMinute = containerWidth / totalMinutes;
  const minutesPerHour = 60;
  const minutesPerDay = minutesPerHour * 24;
  const positionAtMidnight = pxPerMinute * minutesPerDay;

  const startMinutesOffset = startDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight starts on a following day, happens with layovers
  const endMinutesOffset = endDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight ends on a following day, happens with long distance flights and layovers

  const fromTimeAttrs = convertTimeTo24HourClock(fromTime);
  const startTimeInMinutes = startMinutesOffset + fromTimeAttrs.minutes + fromTimeAttrs.hours * minutesPerHour;

  const toTimeAttrs = convertTimeTo24HourClock(toTime);
  const endTimeInMinutes = endMinutesOffset + toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;

  const startPositionPx = startTimeInMinutes * pxPerMinute;
  let endPositionPx = endTimeInMinutes * pxPerMinute;

  if (endPositionPx < startPositionPx) {
    endPositionPx += positionAtMidnight;
  }

  const timeBarWidth = endPositionPx - startPositionPx;
  return { width: timeBarWidth, startX: startPositionPx };
}
