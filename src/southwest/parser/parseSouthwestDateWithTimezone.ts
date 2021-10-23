import { parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

interface ParseDateWithTimezoneProps {
  rawDate: string;
}

export const parseSouthwestDateWithTimezone = ({ rawDate }: ParseDateWithTimezoneProps): Date => {
  // Make sure you format with date-fns-tz to get the time in the timezone originally provided!
  const date = parseISO(rawDate);
  const match = rawDate.match(/[+|-]\d{2}:\d{2}$/);
  if (!match) {
    throw new TypeError("Unknown date format");
  }
  const timezone = match[0];
  return utcToZonedTime(date, timezone);
};
