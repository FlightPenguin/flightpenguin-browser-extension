import { addHours, addMinutes, startOfToday } from "date-fns";

import { FlightTimeDetails } from "../../../types/FlightTimeDetails";

export const getFauxDate = (timeDetails: FlightTimeDetails): Date => {
  // convert TimeDetails to a faux date for date math convenience.
  // This does not do the magic to convert from the form's start date!

  let fauxDate = startOfToday();
  fauxDate = addHours(fauxDate, timeDetails.hours);
  fauxDate = addMinutes(fauxDate, timeDetails.minutes);
  return fauxDate;
};
