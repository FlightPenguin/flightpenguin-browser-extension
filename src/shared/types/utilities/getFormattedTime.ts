import { format } from "date-fns";

export const getFormattedTime = (dateTime: Date, excessDays?: number): string => {
  // returns 12 hour clock time, e.g. 2:42pm
  const formattedTime = format(dateTime, "h:mmaaa");

  if (excessDays) {
    const indicator = excessDays >= 0 ? "+" : "-";
    return `${formattedTime}${indicator}${Math.abs(excessDays)}`;
  }
  return formattedTime;
};
