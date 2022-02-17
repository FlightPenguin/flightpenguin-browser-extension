import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface GetArrivalAirportInput {
  formData: FlightSearchFormData;
  flight: ProcessedFlightSearchResult;
}

export const getArrivalAirport = ({ formData, flight }: GetArrivalAirportInput): string => {
  if (!flight.layovers.length) {
    return formData.to.value.toUpperCase();
  }

  const lastLeg = flight.layovers.slice(-1)[0];
  return lastLeg.to.toUpperCase();
};
