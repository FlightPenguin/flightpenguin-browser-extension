import { addDays, startOfDay, startOfToday } from "date-fns";

import { getParsedDate } from "../../components/utilities/forms";
import { FlightSearchFormData } from "./FlightSearchFormData";

export interface SearchTripMeta {
  airlineCount: number;
  airports: string[];
  airlines: { [keyof: string]: string[] };
  earliestTime: Date;
  intervals: number[];
  layoverCounts: number[];
  latestTime: Date;
}

export const getSearchTripMetaDefault = (formData: FlightSearchFormData, tripIndex: number): SearchTripMeta => {
  const flightDate = startOfDay(
    getParsedDate(formData.roundtrip && tripIndex === 1 ? formData.toDate : formData.fromDate),
  );
  return {
    airlineCount: 0,
    earliestTime: flightDate,
    layoverCounts: [] as number[],
    airlines: {} as { [keyof: string]: string[] },
    airports: [] as string[],
    latestTime: addDays(flightDate, 1),
    intervals: [0, 4, 8, 12, 16, 20, 24, 28],
  };
};
