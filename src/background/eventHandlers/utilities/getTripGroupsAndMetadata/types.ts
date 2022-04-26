import { DisplayableTripInput } from "../../../../shared/types/DisplayableTrip";

export type DisplayableTripInputPrimitive = Pick<DisplayableTripInput, "cabin" | "lowestFare" | "trip">;
