import { FareFamily } from "./Fare";
import { SegmentResults } from "./SegmentResults";

export interface SearchResult {
  airProducts: SegmentResults[];
  fareSummary: FareFamily;
  promoToken: any;
}
