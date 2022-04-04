import { getFlightDateFromTimeString } from "../../shared/parser/getFlightDateFromTimeString";
import { getTripId } from "../../shared/parser/getTripId";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../shared/types/newtypes/Itinerary";
import { TripInput } from "../../shared/types/newtypes/Trip";
import { TripSourceInput } from "../../shared/types/newtypes/TripSource";
import { getDurationInMinutes } from "../../shared/utilities/getDurationInMinutes";
import { getCardData } from "./card/getCardData";
import { getModalData } from "./modal/getModalData";

interface GetFlightProps {
  flightCard: HTMLDivElement;
  formData: FlightSearchFormData;
}

export const getItinerary = async ({ flightCard, formData }: GetFlightProps): Promise<Itinerary> => {
  const cardDetails = getCardData(flightCard, formData.roundtrip);

  const tripId = `${flightCard.dataset.flightId as string}-trip-flight-index`;
  const flights = await getModalData(flightCard, formData.roundtrip, formData.fromDate, formData.toDate, tripId);

  const tripInputs = [] as TripInput[];
  const departureTrip = {
    arrivalDateTime: getFlightDateFromTimeString(cardDetails.departure.arrivalTime, formData.fromDate),
    arrivalLocation: { code: formData.from.value },
    departureDateTime: getFlightDateFromTimeString(cardDetails.departure.departureTime, formData.fromDate),
    departureLocation: { code: formData.to.value },
    durationMinutes: getDurationInMinutes(cardDetails.departure.duration),
    tripComponents: flights.departure.map((input) => {
      return { type: "FLIGHT", object: input };
    }),
  } as TripInput;
  tripInputs.push(departureTrip);

  if (formData.roundtrip && (!cardDetails.return || !flights.return)) {
    throw new Error("Roundtrip without return...");
  }
  const returnTrip =
    formData.roundtrip && cardDetails.return && flights.return
      ? ({
          arrivalDateTime: getFlightDateFromTimeString(cardDetails.return.arrivalTime, formData.toDate),
          arrivalLocation: { code: formData.to.value },
          departureDateTime: getFlightDateFromTimeString(cardDetails.return.departureTime, formData.toDate),
          departureLocation: { code: formData.from.value },
          durationMinutes: getDurationInMinutes(cardDetails.return.duration),
          tripComponents: flights.return.map((input) => {
            return { type: "FLIGHT", object: input };
          }),
        } as TripInput)
      : null;
  if (returnTrip) {
    tripInputs.push(returnTrip);
  }

  const itin = new Itinerary({
    sources: [
      {
        fare: Number(cardDetails.fare),
        id: tripId,
        name: "trip",
      } as TripSourceInput,
    ],
    trips: tripInputs,
    cabin: formData.cabin || "econ",
  });

  setFlightId(flightCard, itin.getId());

  return itin;
};

const setFlightId = (flightCard: HTMLDivElement, id: string) => {
  flightCard.dataset.fpid = id;
  flightCard.dataset.fpVisited = "true";
};