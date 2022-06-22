import { addDays, startOfDay, startOfToday } from "date-fns";

import { getParsedDate } from "../../components/utilities/forms";
import { FlightSearchFormData } from "./FlightSearchFormData";

export interface SearchTripMeta {
  airlineCount: number;
  airlines: { [keyof: string]: string[] };
  airports: string[];
  bookingSources: string[];
  earliestTime: Date;
  intervals: number[];
  latestTime: Date;
  layoverCounts: number[];
}

export const getSearchTripMetaDefault = (formData: FlightSearchFormData, tripIndex: number): SearchTripMeta => {
  const flightDate = startOfDay(
    getParsedDate(formData.roundtrip && tripIndex === 1 ? formData.toDate : formData.fromDate),
  );
  return {
    airlineCount: 0,
    airlines: {} as { [keyof: string]: string[] },
    airports: [] as string[],
    bookingSources: [] as string[],
    earliestTime: flightDate,
    latestTime: addDays(flightDate, 1),
    layoverCounts: [] as number[],
    intervals: [0, 4, 8, 12, 16, 20, 24, 28],
  };
};
