import { FlightTimeDetails } from "../types/FlightTimeDetails";

interface GetFormatted12HourClockTimeFromTimeDetailsProps {
  timeDetails: FlightTimeDetails;
}

export const getFormatted12HourClockTimeFromTimeDetails = ({
  timeDetails,
}: GetFormatted12HourClockTimeFromTimeDetailsProps): string => {
  let minutes = `${timeDetails.minutes}`;
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  let output = `${timeDetails.displayHours}:${minutes}${timeDetails.timeOfDay}`;
  if (timeDetails.excessDays) {
    output = `${output}${timeDetails.excessDays}`;
  }
  return output;
};
