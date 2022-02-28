import { ParserError } from "../../shared/errors";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { getFlightPenguinTripId } from "../../shared/utilities/getFlightPenguinTripId";
import { CheapoAirFlight } from "../typings/Flight";
import { closeFlightSegmentCard } from "../ui/closeFlightSegmentCard";
import { openFlightSegmentCard } from "../ui/openFlightSegmentCard";
import { getAllFlightsDetails } from "./flightCard/getAllFlightsDetails";
import { getFare } from "./flightCard/getFare";
import { getAllFlightLegs } from "./flightLegsCard/getAllFlightLegs";
import { shouldSkipCard } from "./shouldSkipCard";

export const getFlight = async (
  flightCard: HTMLElement,
  formData: FlightSearchFormData,
  cheapoAirId: string,
): Promise<CheapoAirFlight | null> => {
  if (shouldSkipCard(flightCard)) {
    setVisited(flightCard);
    return null;
  }

  const fare = getFare(flightCard);
  const flightsDetails = getAllFlightsDetails(flightCard, formData);
  const flightSegmentsContainer = await openFlightSegmentCard(flightCard);
  const flightLegs = getAllFlightLegs(flightSegmentsContainer, formData);
  await closeFlightSegmentCard(flightCard);

  if (formData.roundtrip && !flightsDetails.returnDetails) {
    throw new ParserError("Missing return flight details");
  }

  if (formData.roundtrip && !flightLegs.returnLegs) {
    throw new ParserError("Missing return flight legs");
  }

  const departureFlight = new FlightDetails({
    departureDate: formData.fromDate,
    duration: flightsDetails.departureDetails.duration,
    fromTime: flightsDetails.departureDetails.departureTime,
    layovers: flightLegs.departureLegs,
    operatingAirline: flightsDetails.departureDetails.airline,
    marketingAirline: flightsDetails.departureDetails.airline,
    toTime: flightsDetails.departureDetails.arrivalTime,
  });

  const returnFlight =
    formData.roundtrip && flightsDetails.returnDetails && flightLegs.returnLegs
      ? new FlightDetails({
          departureDate: formData.toDate,
          duration: flightsDetails.returnDetails.duration,
          fromTime: flightsDetails.returnDetails.departureTime,
          layovers: flightLegs.returnLegs,
          operatingAirline: flightsDetails.returnDetails.airline,
          marketingAirline: flightsDetails.departureDetails.airline,
          toTime: flightsDetails.returnDetails.arrivalTime,
        })
      : null;

  setVisited(flightCard);

  return {
    departureFlight,
    returnFlight,
    fare: fare,
    id: getFlightPenguinTripId(departureFlight.id, returnFlight ? returnFlight.id : ""),
    cheapoAirId: cheapoAirId,
  };
};

const setVisited = (flightCard: HTMLElement): void => {
  flightCard.dataset.fpVisited = "true";
};
