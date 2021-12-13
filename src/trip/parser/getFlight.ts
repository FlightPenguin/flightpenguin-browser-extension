import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { getFlightPenguinId } from "../shared/getFlightPenguinId";
import { getFlightCardData } from "./flight/getFlightCardData";
import { getModalData } from "./modal/getModalData";

interface GetFlightProps {
  flightCard: HTMLDivElement;
  formData: FlightSearchFormData;
}

export const getFlight = async ({ flightCard, formData }: GetFlightProps): Promise<UnprocessedFlightSearchResult> => {
  const flightCardDetails = getFlightCardData(flightCard, formData.roundtrip);
  const layoverDetails = await getModalData(flightCard, formData.roundtrip, formData.fromDate);

  const departureFlight = new FlightDetails({
    departureDate: formData.fromDate,
    duration: flightCardDetails.departure.duration,
    fromTime: flightCardDetails.departure.departureTime,
    layovers: layoverDetails.departure,
    marketingAirline: flightCardDetails.departure.marketingAirline,
    toTime: flightCardDetails.departure.arrivalTime,
  });

  if (formData.roundtrip && (!flightCardDetails.return || !layoverDetails.return)) {
    throw new Error("Roundtrip without return...");
  }

  const returnFlight = formData.roundtrip
    ? new FlightDetails({
        departureDate: formData.fromDate,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        duration: flightCardDetails.return.duration,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fromTime: flightCardDetails.return.departureTime,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        layovers: layoverDetails.return,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        marketingAirline: flightCardDetails.return.marketingAirline,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        toTime: flightCardDetails.return.arrivalTime,
      })
    : null;

  const id = getFlightPenguinId(departureFlight.id, formData.roundtrip && returnFlight ? returnFlight.id : null);
  setFlightId(flightCard, id);

  return {
    id,
    departureFlight,
    returnFlight,
    fare: flightCardDetails.fare,
  } as UnprocessedFlightSearchResult;
};

const setFlightId = (flightCard: HTMLDivElement, id: string) => {
  flightCard.dataset.fpid = id;
  flightCard.dataset.visited = "true";
};
