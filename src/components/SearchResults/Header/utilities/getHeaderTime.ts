import { convertMinutesTo12HourClock } from "../../../../utilityFunctions";

export const getHeaderTime = (interval: number, offset?: number): string => {
  let timeMinutes = interval * 60;
  if (offset) {
    timeMinutes -= offset;
  }
  const time = convertMinutesTo12HourClock(Math.abs(timeMinutes));
  return time.replace(":00", "");
};
