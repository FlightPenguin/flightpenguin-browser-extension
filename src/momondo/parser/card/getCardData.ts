import { getBookingLink } from "./getBookingLink";
import { getFare } from "./getFare";
import { getTrackingId } from "./getTrackingId";
import { getTripContainers } from "./getTripContainers";
import { getDuration } from "./tripContainer/getDuration";
import { getTripTimes } from "./tripContainer/getTripTimes";

interface TripFlightData {
  arrivalTime: string;
  departureTime: string;
  duration: string;
}

interface CardData {
  bookingLink: string;
  fare: string;
  trackingId: string;
  trips: TripFlightData[];
}

export const getCardData = async (itineraryCard: HTMLDivElement, expectedTripCount: number): Promise<CardData> => {
  const bookingLink = getBookingLink(itineraryCard);
  const fare = await getFare(itineraryCard);
  const trackingId = getTrackingId(itineraryCard);

  const tripContainers = getTripContainers(itineraryCard, expectedTripCount);
  const trips = tripContainers.map((tripContainer) => {
    const { departureTime, arrivalTime } = getTripTimes(tripContainer);
    const duration = getDuration(tripContainer);
    return { arrivalTime, departureTime, duration } as TripFlightData;
  });

  return { bookingLink, fare, trackingId, trips } as CardData;
};
