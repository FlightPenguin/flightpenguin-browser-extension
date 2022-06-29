import { ParserError } from "../../../../shared/errors";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../../../shared/types/Itinerary";
import { TripInput } from "../../../../shared/types/Trip";
import { TripSourceInput } from "../../../../shared/types/TripSource";
import { getFare } from "./card/getFare";
import { getTripsMetadata } from "./card/getTripsMetadata";
import { getTripComponentInputs } from "./modal/getTrips";

interface GetFlightProps {
  flightCard: HTMLDivElement;
  formData: FlightSearchFormData;
}

export const getItinerary = async ({ flightCard, formData }: GetFlightProps): Promise<Itinerary> => {
  const fare = getFare(flightCard);

  const tripsComponents = await getTripComponentInputs({ flightCard, roundtrip: formData.roundtrip });
  const tripMetadatas = getTripsMetadata({ flightCard, roundtrip: formData.roundtrip });
  if (tripsComponents.length !== tripMetadatas.length) {
    throw new ParserError(
      `Found ${tripMetadatas.length} trips and ${tripsComponents.length} flight groups, expected these to be equal`,
    );
  }

  const tripInputs = tripMetadatas.map((tripMetadata, index) => {
    const tripComponents = tripsComponents[index];
    return {
      ...tripMetadata,
      tripComponents,
    } as TripInput;
  });

  const sourceInput: TripSourceInput = { fare, name: "kiwi", isFirstParty: false };
  const itinerary = new Itinerary({ sources: [sourceInput], trips: tripInputs, cabin: formData.cabin || "econ" });
  setFlightId(flightCard, itinerary.getId());

  return itinerary;
};

const setFlightId = (flightCard: HTMLDivElement, id: string) => {
  flightCard.dataset.fpid = id;
  flightCard.dataset.fpVisited = "true";
};
