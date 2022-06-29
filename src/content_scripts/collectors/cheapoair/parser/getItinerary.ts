import { ParserError } from "../../../../shared/errors";
import { getFlightDateFromTimeString } from "../../../../shared/parser/getFlightDateFromTimeString";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../../../shared/types/Itinerary";
import { TripInput } from "../../../../shared/types/Trip";
import { TripSourceInput } from "../../../../shared/types/TripSource";
import { getDurationInMinutes } from "../../../../shared/utilities/getDurationInMinutes";
import { closeDetailsCard } from "../ui/closeDetailsCard";
import { openDetailsCard } from "../ui/openDetailsCard";
import { getFlights } from "./detailsCard/getFlights";
import { getAllTripsDetails } from "./overviewCard/getAllTripsDetails";
import { getFare } from "./overviewCard/getFare";
import { shouldSkipCard } from "./shouldSkipCard";

export const getItinerary = async (
  overviewCard: HTMLElement,
  formData: FlightSearchFormData,
  cheapoAirId: string,
): Promise<Itinerary | null> => {
  if (shouldSkipCard(overviewCard)) {
    setVisited(overviewCard);
    return null;
  }

  const fare = getFare(overviewCard);
  const tripsDetails = getAllTripsDetails(overviewCard, formData);
  const detailsContainer = await openDetailsCard(overviewCard);
  const flights = getFlights(detailsContainer, formData);
  await closeDetailsCard(overviewCard);

  if (formData.roundtrip && !tripsDetails.returnDetails) {
    throw new ParserError("Missing return trip details");
  }

  if (formData.roundtrip && !flights.returnFlights) {
    throw new ParserError("Missing return flights");
  }

  const tripInputs = [] as TripInput[];

  const departureTrip = {
    arrivalDateTime: getFlightDateFromTimeString(tripsDetails.departureDetails.arrivalTime, formData.fromDate),
    arrivalLocation: { code: flights.departureFlights.slice(-1)[0].arrivalLocation.code },
    departureDateTime: getFlightDateFromTimeString(tripsDetails.departureDetails.departureTime, formData.fromDate),
    departureLocation: { code: flights.departureFlights[0].departureLocation.code },
    durationMinutes: getDurationInMinutes(tripsDetails.departureDetails.duration),
    tripComponents: flights.departureFlights.map((input) => {
      return { type: "FLIGHT", object: input };
    }),
  } as TripInput;
  tripInputs.push(departureTrip);

  const returnTrip =
    formData.roundtrip && tripsDetails.returnDetails && flights.returnFlights
      ? ({
          arrivalDateTime: getFlightDateFromTimeString(tripsDetails.returnDetails.arrivalTime, formData.toDate),
          arrivalLocation: { code: flights.returnFlights.slice(-1)[0].arrivalLocation.code },
          departureDateTime: getFlightDateFromTimeString(tripsDetails.returnDetails.departureTime, formData.toDate),
          departureLocation: { code: flights.returnFlights[0].departureLocation.code },
          durationMinutes: getDurationInMinutes(tripsDetails.returnDetails.duration),
          tripComponents: flights.returnFlights.map((input) => {
            return { type: "FLIGHT", object: input };
          }),
        } as TripInput)
      : null;
  if (returnTrip) {
    tripInputs.push(returnTrip);
  }

  setVisited(overviewCard);

  return new Itinerary({
    sources: [
      {
        fare,
        id: cheapoAirId,
        name: "cheapoair",
        isFirstParty: false,
      } as TripSourceInput,
    ],
    trips: tripInputs,
    cabin: formData.cabin || "econ",
  });
};

const setVisited = (overviewCard: HTMLElement): void => {
  overviewCard.dataset.fpVisited = "true";
};
