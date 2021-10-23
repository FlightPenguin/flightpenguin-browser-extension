import { Fare } from "./Fare";
import { Flight } from "./Flight";

export interface SegmentResults {
  containsAfterSix: boolean;
  containsAvailability: boolean;
  containsBeforeNoon: boolean;
  containsDirect: boolean;
  containsNonstop: boolean;
  containsStops: boolean;
  containsTimeOfDay: boolean;
  currencyCode: string | null;
  destinationAirport: string;
  details: Flight[];
  fastestDuration: string;
  id: string;
  lowestFare: Fare;
  originationAirportCode: string;
  seatsLeftBannerDisplayed: boolean;
}
