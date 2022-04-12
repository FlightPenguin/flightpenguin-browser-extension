import { differenceInMinutes } from "date-fns";

export const getTimezoneOffset = (arrivalTime: Date, departureTime: Date, durationInMinutes: number): number => {
  const relativeDifference = differenceInMinutes(arrivalTime, departureTime);
  return relativeDifference - durationInMinutes;
};
