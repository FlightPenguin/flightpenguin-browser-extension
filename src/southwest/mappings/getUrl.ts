import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, roundtrip } = formData;

  const fromCaps = from.toUpperCase();
  const toCaps = to.toUpperCase();

  let url = `https://www.southwest.com/air/booking/select.html?adultPassengersCount=${numPax}&departureDate=${fromDate}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${toCaps}&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=${fromCaps}&passengerType=ADULT&reset=true&seniorPassengersCount=0`;
  url += roundtrip
    ? `&returnDate=${toDate}&returnTimeOfDay=ALL_DAY&tripType=roundtrip`
    : `&returnDate=&returnTimeOfDay=ALL_DAY&tripType=oneway`;
  return url;
};
