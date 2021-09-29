import { CabinType } from "../../background/constants";
import { CardType } from "../../components/constants";

export interface FlightSearchFormData {
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  numPax: number;
  roundtrip: boolean;
  cabin?: CabinType;
  searchByPoints: boolean;
  pointsType: CardType | undefined;
}
