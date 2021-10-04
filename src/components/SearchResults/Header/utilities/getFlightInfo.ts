import { parse } from "date-fns";

import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";

export const getFlightInfo = (
  formData: FlightSearchFormData,
  flightType: "DEPARTURE" | "RETURN",
): { startDate: Date; departureAirportCode: string; arrivalAirportCode: string } => {
  let startDate;
  let departureAirportCode;
  let arrivalAirportCode;
  if (flightType === "DEPARTURE") {
    startDate = formData.fromDate;
    departureAirportCode = formData.from;
    arrivalAirportCode = formData.to;
  } else {
    startDate = formData.toDate;
    departureAirportCode = formData.to;
    arrivalAirportCode = formData.from;
  }

  return {
    startDate: parse(startDate, "yyyy-MM-dd", new Date()),
    departureAirportCode,
    arrivalAirportCode,
  };
};
