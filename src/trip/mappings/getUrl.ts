// https://us.trip.com/flights/columbus-to-denver/tickets-cmh-den?FlightWay=RT&class=F&Quantity=1&ChildQty=0&BabyQty=0&dcity=cmh&acity=den&ddate=2021-12-11&rdate=2021-12-14

import { Airport } from "../../components/SearchForm/api/airports/Airport";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { cabinMap } from "./cabin";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const tripType = roundtrip ? "RT" : "OW";
  const cabinValue = cabinMap[cabin || "econ"];
  const destinationCity = getCityValue(from);
  const arrivalCity = getCityValue(to);

  let url = `https://www.trip.com/flights/${from.value.toUpperCase()}-to-${to.value.toUpperCase()}/tickets-${from.value.toUpperCase()}-${to.value.toUpperCase()}?FlightWay=${tripType}&class=${cabinValue}&Quantity=${numPax}&ddate=${fromDate}&dcity=${destinationCity}&acity=${arrivalCity}&curr=USD`;
  if (roundtrip) {
    url += `&rdate=${toDate}`;
  }
  return url;
};

const getCityValue = (airport: Airport): string => {
  if (airport.type === "city") {
    return airport.value.toLowerCase();
  }
  return `${airport.value.toUpperCase()}%2C${airport.value.toUpperCase()}`;
};
