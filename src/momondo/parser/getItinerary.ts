import { getParsedDate } from "../../components/utilities/forms";
import { ParserError } from "../../shared/errors";
import { getFlightDateFromTimeString } from "../../shared/parser/getFlightDateFromTimeString";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../shared/types/newtypes/Itinerary";
import { TripInput } from "../../shared/types/newtypes/Trip";
import { getDurationInMinutes } from "../../shared/utilities/getDurationInMinutes";
import { closeModal } from "../ui/modal/closeModal";
import { openModal } from "../ui/modal/openModal";
import { getCardData } from "./card/getCardData";
import { getModalData } from "./modal/getModalData";
import { getModal } from "./modal/tripContainer/getModal";

export const getItinerary = async (
  itineraryCard: HTMLDivElement,
  formData: FlightSearchFormData,
): Promise<Itinerary> => {
  const expectedTripCount = formData.roundtrip ? 2 : 1;
  const tripDepartureDates = formData.roundtrip
    ? [getParsedDate(formData.fromDate), getParsedDate(formData.toDate)]
    : [getParsedDate(formData.fromDate)];

  const cardData = getCardData(itineraryCard, expectedTripCount);

  const modal = await getModal(itineraryCard);
  const modalData = await getModalData(modal, expectedTripCount, tripDepartureDates);

  if (modalData.length !== cardData.trips.length) {
    throw new ParserError("Data mismatch in modal and card");
  }

  const tripInputs = cardData.trips.map((trip, index) => {
    const flightInputs = modalData[index];
    const flightDate = tripDepartureDates[index];

    return {
      arrivalDateTime: getFlightDateFromTimeString(trip.arrivalTime, flightDate),
      arrivalLocation: { code: index === 1 ? formData.to.value : formData.from.value },
      departureDateTime: getFlightDateFromTimeString(trip.departureTime, flightDate),
      departureLocation: { code: index === 1 ? formData.from.value : formData.to.value },
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
