import { getParsedDate } from "../../../../components/utilities/forms";
import { ParserError } from "../../../../shared/errors";
import { getFlightDateFromTimeString } from "../../../../shared/parser/getFlightDateFromTimeString";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../../../shared/types/Itinerary";
import { TripInput } from "../../../../shared/types/Trip";
import { getDurationInMinutes } from "../../../../shared/utilities/getDurationInMinutes";
import { getCardData } from "./card/getCardData";
import { getModalData } from "./modal/getModalData";
import { getModal } from "./modal/tripContainer/getModal";
import { updateBookingLinks } from "./modal/updateBookingLinks";

export const getItinerary = async (
  itineraryCard: HTMLDivElement,
  formData: FlightSearchFormData,
): Promise<Itinerary> => {
  const expectedTripCount = formData.roundtrip ? 2 : 1;
  const tripDepartureDates = formData.roundtrip
    ? [getParsedDate(formData.fromDate), getParsedDate(formData.toDate)]
    : [getParsedDate(formData.fromDate)];

  const cardData = await getCardData(itineraryCard, expectedTripCount);

  const modal = await getModal(itineraryCard);
  updateBookingLinks(modal);
  const modalData = await getModalData(modal, expectedTripCount, tripDepartureDates);

  if (modalData.length !== cardData.trips.length) {
    throw new ParserError("Data mismatch in modal and card");
  }

  const tripInputs = cardData.trips.map((trip, index) => {
    const flightInputs = modalData[index];
    const flightDate = tripDepartureDates[index];

    const arrivalLocation = flightInputs.slice(-1)[0].arrivalLocation;
    const departureLocation = flightInputs[0].departureLocation;

    return {
      arrivalDateTime: getFlightDateFromTimeString(trip.arrivalTime, flightDate),
      arrivalLocation,
      departureDateTime: getFlightDateFromTimeString(trip.departureTime, flightDate),
      departureLocation,
      durationMinutes: getDurationInMinutes(trip.duration),
      tripComponents: flightInputs.map((flightInput) => {
        return { type: "FLIGHT", object: flightInput };
      }),
    } as TripInput;
  });

  return new Itinerary({
    cabin: formData.cabin || "econ",
    sources: [{ fare: Number(cardData.fare), id: cardData.trackingId, name: "momondo" }],
    trips: tripInputs,
  });
};
