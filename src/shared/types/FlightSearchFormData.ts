import { CardType } from "../../components/constants";

export interface FlightSearchFormData {
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  numPax: number;
  roundtrip: boolean;
  cabin?: "econ" | "prem_econ" | "business" | "first";
  searchByPoints: boolean;
  pointsType: CardType | undefined;
}
