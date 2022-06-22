import { DisplayableTripInput } from "../../../../shared/types/DisplayableTrip";

export type DisplayableTripInputPrimitive = Pick<
  DisplayableTripInput,
  "bookingSources" | "cabin" | "lowestFare" | "trip"
>;
