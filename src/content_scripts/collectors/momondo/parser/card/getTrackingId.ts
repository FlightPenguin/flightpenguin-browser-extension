import { MissingFieldParserError } from "../../../../../shared/errors";

export const getTrackingId = (itineraryCard: HTMLDivElement): string => {
  const trackingId = itineraryCard.dataset.resultid;
  if (!trackingId) {
    throw new MissingFieldParserError("Unable to extract tracking id");
  }
  return trackingId;
};
