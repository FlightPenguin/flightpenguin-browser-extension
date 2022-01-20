import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface IsFlightThroughCityProps {
  flight: ProcessedFlightSearchResult;
  cities: string[] | undefined;
}

export const isFlightThroughCity = ({ flight, cities }: IsFlightThroughCityProps): boolean => {
  if (cities && cities.length >= 1) {
    return cities.every((city) => flight.layoverAirports.includes(city));
  }
  return true;
};
