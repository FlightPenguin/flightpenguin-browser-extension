import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";

export const getFlightInfo = (formData: FlightSearchFormData, flightType: "DEPARTURE" | "RETURN") => {
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

  const [year, month, day] = startDate.split("-").map((date: string) => Number(date));
  return {
    startDate: new Date(year, month, day),
    departureAirportCode,
    arrivalAirportCode,
  };
};
