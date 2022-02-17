import { CabinType } from "../../background/constants";
import { CardType } from "../../components/constants";
import { Airport } from "../../components/SearchForm/api/airports/Airport";

export interface FlightSearchFormData {
  from: Airport;
  to: Airport;
  fromDate: string;
  toDate: string;
  numPax: number;
  roundtrip: boolean;
  cabin?: CabinType;
  searchByPoints: boolean;
  pointsType: CardType | undefined;
}
