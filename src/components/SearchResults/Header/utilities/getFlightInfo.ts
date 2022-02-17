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
    departureAirportCode = formData.from.value.toUpperCase();
    arrivalAirportCode = formData.to.value.toUpperCase();
  } else {
    startDate = formData.toDate;
    departureAirportCode = formData.to.value.toUpperCase();
    arrivalAirportCode = formData.from.value.toUpperCase();
  }

  return {
    startDate: parse(startDate, "yyyy-MM-dd", new Date()),
    departureAirportCode,
    arrivalAirportCode,
  };
};
