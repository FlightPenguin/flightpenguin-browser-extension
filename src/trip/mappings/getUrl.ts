// https://us.trip.com/flights/columbus-to-denver/tickets-cmh-den?FlightWay=RT&class=F&Quantity=1&ChildQty=0&BabyQty=0&dcity=cmh&acity=den&ddate=2021-12-11&rdate=2021-12-14

import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { cabinMap } from "./cabin";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const tripType = roundtrip ? "RT" : "OW";
  const cabinValue = cabinMap[cabin || "econ"];

  let url = `https://www.trip.com/flights/${from}-to-${to}/tickets-${from}-${to}?FlightWay=${tripType}&class=${cabinValue}&Quantity=${numPax}&ddate=${fromDate}`;
  if (roundtrip) {
    url += `&rdate=${toDate}`;
  }
  return url;
};
