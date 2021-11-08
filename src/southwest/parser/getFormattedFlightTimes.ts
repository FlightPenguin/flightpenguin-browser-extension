import { differenceInDays, startOfDay } from "date-fns";
import { format } from "date-fns-tz";

import { parseSouthwestDateWithTimezone } from "./parseSouthwestDateWithTimezone";

interface GetFormattedFlightTimesProps {
  southwestDepartureDateTime: string;
  southwestArrivalDateTime: string;
}

interface GetFormattedFlightTimesOutput {
  departureDateTime: Date;
  arrivalDateTime: Date;
  formattedDepartureDateTime: string;
  formattedArrivalDateTime: string;
}

export const getFormattedFlightTimes = ({
  southwestDepartureDateTime,
  southwestArrivalDateTime,
}: GetFormattedFlightTimesProps): GetFormattedFlightTimesOutput => {
  const departureDateTime = parseSouthwestDateWithTimezone({ rawDate: southwestDepartureDateTime });
  const arrivalDateTime = parseSouthwestDateWithTimezone({ rawDate: southwestArrivalDateTime });

  const formattedDepartureDateTime = format(departureDateTime, "h:mmaaa");
  let formattedArrivalDateTime = format(arrivalDateTime, "h:mmaaa");
  const dateDiff = Math.abs(differenceInDays(startOfDay(arrivalDateTime), startOfDay(departureDateTime)));
  if (dateDiff) {
    formattedArrivalDateTime = `${formattedArrivalDateTime}+${dateDiff}`;
  }

  return { departureDateTime, arrivalDateTime, formattedDepartureDateTime, formattedArrivalDateTime };
};
