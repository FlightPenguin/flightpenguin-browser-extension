import { addDays, addHours, addMinutes, parse } from "date-fns";

import { FlightTimeDetails } from "../../../../shared/types/FlightTimeDetails";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";

interface GetSkeletonItinerariesWithFlightDatesProps {
  itineraries: any;
  fromDate: string;
  toDate: string;
}

export const getSkeletonItinerariesWithFlightDates = ({
  itineraries,
  fromDate,
  toDate,
}: GetSkeletonItinerariesWithFlightDatesProps): { [keyof: string]: ProcessedItinerary } => {
  const refDate = new Date();
  const departureDate = parse(fromDate, "yyyy-MM-dd", refDate);
  const returnDate = parse(toDate, "yyyy-MM-dd", refDate);
  Object.values(itineraries).forEach((itinerary: any) => {
    itinerary.depFlight.fromDateTime = getFlightDate(departureDate, itinerary.depFlight.fromTimeDetails);
    itinerary.depFlight.toDateTime = getFlightDate(departureDate, itinerary.depFlight.toTimeDetails);
    itinerary.retFlight.fromDateTime = getFlightDate(returnDate, itinerary.retFlight.fromTimeDetails);
    itinerary.retFlight.toDateTime = getFlightDate(returnDate, itinerary.retFlight.toTimeDetails);
  });
  return itineraries as { [keyof: string]: ProcessedItinerary };
};

const getFlightDate = (flightDepartureDate: Date, timeDetails: FlightTimeDetails): Date => {
  let value = flightDepartureDate;
  if (timeDetails.excessDays) {
    const excessDays = Number(timeDetails.excessDays.split("+").slice(-1)[0]);
    value = addDays(value, excessDays);
  }
  if (timeDetails.hours) {
    value = addHours(value, timeDetails.hours);
  }
  if (timeDetails.minutes) {
    value = addMinutes(value, timeDetails.minutes);
  }
  return value;
};
