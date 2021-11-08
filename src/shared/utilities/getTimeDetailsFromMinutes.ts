import { FlightTimeDetails } from "../types/FlightTimeDetails";

interface GetTimeDetailsFromMinutesProps {
  minutes: number;
}

export const getTimeDetailsFromMinutes = ({ minutes }: GetTimeDetailsFromMinutesProps): FlightTimeDetails => {
  const elapsedDays = Math.floor(minutes / 1440);
  minutes -= elapsedDays * 1440;

  const elapsedHours = Math.floor(minutes / 60);
  minutes = minutes - elapsedHours * 60;

  let displayHours = elapsedHours % 12;
  if (displayHours === 0) {
    displayHours = 12;
  }

  return {
    hours: elapsedHours,
    excessDays: elapsedDays ? `+${elapsedDays}` : null,
    minutes: minutes,
    displayHours: displayHours,
    timeOfDay: elapsedHours >= 12 ? "pm" : "am",
  };
};
