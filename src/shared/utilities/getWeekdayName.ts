import getISODay from "date-fns/getISODay";

const isoNumberToDateMap: { [keyof: string]: string } = {
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
  "7": "Sunday",
};

export const getWeekdayName = (date: Date) => {
  const index = getISODay(date);
  return isoNumberToDateMap[index.toString()];
};
