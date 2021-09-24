import { startOfDay } from "date-fns";

export const getExcessDays = (departureDate: Date, arrivalDate: Date): number => {
  let value = Math.floor(Math.abs(startOfDay(departureDate).valueOf() - startOfDay(arrivalDate).valueOf()) / 86400000);
  if (arrivalDate <= departureDate) {
    value += 1;
  }
  return value;
};
