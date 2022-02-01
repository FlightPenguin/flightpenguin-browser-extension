import { getDurationInMinutes } from "./getDurationInMinutes";
import { getElapsedTime } from "./getElapsedTime";

export const getTimezoneOffset = (fromTime: string, toTime: string, duration: string): number => {
  const { hours: fromHr, minutes: fromMin } = getElapsedTime(fromTime, false);
  const { hours: toHr, minutes: toMin } = getElapsedTime(toTime, false);

  const endsNextDay = toTime.match(/(\+\d)/);
  const startsNextDay = fromTime.match(/(\+\d)/);
  let startDayOffset = 0;
  let endDayOffset = 0;

  if (startsNextDay) {
    const startDays = startsNextDay[0].split("+")[1];
    startDayOffset += Number(startDays);
    endDayOffset = startDayOffset;
  }
  if (endsNextDay) {
    const endDays = endsNextDay[0].split("+")[1];
    endDayOffset += Number(endDays);
  }

  const fromTotalMinutes = (fromHr + 24 * startDayOffset) * 60 + fromMin;
  const toTotalMinutes = (toHr + 24 * endDayOffset) * 60 + toMin;

  const durationMinutes = getDurationInMinutes(duration);

  return durationMinutes - (toTotalMinutes - fromTotalMinutes);
};
