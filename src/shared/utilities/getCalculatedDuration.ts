import { FlightTimeDetails } from "../types/FlightTimeDetails";

export const getCalculatedDuration = (
  fromTimeDetails: FlightTimeDetails,
  toTimeDetails: FlightTimeDetails,
): { durationInMinutes: number; duration: string } => {
  let endHours = toTimeDetails.hours;
  while (
    fromTimeDetails.hours > endHours ||
    (fromTimeDetails.hours === endHours && fromTimeDetails.minutes > toTimeDetails.minutes)
  ) {
    endHours += 24;
  }

  const durationInMinutes =
    endHours * 60 + toTimeDetails.minutes - (fromTimeDetails.hours * 60 + fromTimeDetails.minutes);

  const durationHours = Math.floor(durationInMinutes / 60);
  const durationMinutes = durationInMinutes - durationHours * 60;

  let duration;
  if (durationHours && !durationMinutes) {
    duration = `${durationHours}h`;
  } else {
    duration = durationHours ? `${durationHours}h ${durationMinutes}m` : `${durationMinutes}m`;
  }

  return { durationInMinutes, duration };
};
