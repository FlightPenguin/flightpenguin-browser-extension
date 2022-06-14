import { Airport } from "../../../../components/SearchForm/api/airports/Airport";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { cabinMap } from "./cabin";
import { KIWI_CITY_MAPPING } from "./cities";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const returnDate = roundtrip ? toDate : "no-return";
  const cabinValue = cabinMap[cabin || "econ"];
  const departureValue = getAirportOrCityValue(from);
  const arrivalValue = getAirportOrCityValue(to);

  return `https://www.kiwi.com/us/search/results/${departureValue}/${arrivalValue}/${fromDate}/${returnDate}?adults=${numPax}&cabinClass=${cabinValue}-false&returnFromDifferentAirport=false&returnToDifferentAirport=false&sortBy=duration&currency=usd`;
};

export const getAirportOrCityValue = (airport: Airport): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return airport.type === "airport" ? airport.value.toUpperCase() : KIWI_CITY_MAPPING[airport.value] || "ZZZ";
};
