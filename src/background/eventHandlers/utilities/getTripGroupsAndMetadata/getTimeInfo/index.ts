import { FlightSearchFormData } from "../../../../../shared/types/FlightSearchFormData";
import { DisplayableTripInputPrimitive } from "../types";
import { getTripGroupTimeInfo } from "./getTripGroupTimeInfo";
import { TripGroupTimeMetadata } from "./TripGroupTimeMetadata";

export const getTimeInfo = (
  tripGroups: DisplayableTripInputPrimitive[][],
  formData: FlightSearchFormData,
): TripGroupTimeMetadata[] => {
  return tripGroups.map((tripGroup, index) => {
    return getTripGroupTimeInfo(tripGroup, formData, index);
  });
};
