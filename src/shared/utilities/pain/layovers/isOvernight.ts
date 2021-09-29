import { FlightTimeDetails } from "../../../types/FlightTimeDetails";

export const isOvernight = (startTime: FlightTimeDetails, endTime: FlightTimeDetails): boolean => {
  return (
    Math.floor(startTime.hours / 24) !== Math.floor(endTime.hours / 24) ||
    (startTime.hours % 24 < 2 && endTime.hours % 24 <= 9)
  );
};
