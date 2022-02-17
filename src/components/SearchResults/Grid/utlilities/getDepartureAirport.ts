import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface GetDepartureAirportInput {
  formData: FlightSearchFormData;
  flight: ProcessedFlightSearchResult;
}

export const getDepartureAirport = ({ formData, flight }: GetDepartureAirportInput): string => {
  if (!flight.layovers.length) {
    return formData.from.value.toUpperCase();
  }

  const firstLeg = flight.layovers[0];
  return firstLeg.from.toUpperCase();
};
