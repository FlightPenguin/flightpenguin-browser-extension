import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { cabinMap } from "./cabin";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const returnDate = roundtrip ? toDate : "no-return";
  const cabinValue = cabinMap[formData.cabin || "econ"];
  return `https://www.kiwi.com/us/search/results/${from}/${to}/${fromDate}/${returnDate}?adults=${numPax}&cabinClass=${cabinValue}-false&returnFromDifferentAirport=false&returnToDifferentAirport=false&sortBy=duration`;
};
