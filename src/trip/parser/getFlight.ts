import { getParsedDate } from "../../components/utilities/forms";
import { getTripId } from "../../shared/parser/getTripId";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { getFlightCardData } from "./flight/getFlightCardData";
import { getModalData } from "./modal/getModalData";

interface GetFlightProps {
  flightCard: HTMLDivElement;
  formData: FlightSearchFormData;
}

export const getFlight = async ({ flightCard, formData }: GetFlightProps): Promise<UnprocessedFlightSearchResult> => {
  const flightCardDetails = getFlightCardData(flightCard, formData.roundtrip);

  const tripId = getTripId({
    departureFlight: {
      arrivalTime: flightCardDetails.departure.arrivalTime,
      departureTime: flightCardDetails.departure.departureTime,
      airlineName: flightCardDetails.departure.marketingAirline,
    },
    returnFlight:
      formData.roundtrip && flightCardDetails.return
        ? {
            arrivalTime: flightCardDetails.return.arrivalTime,
            departureTime: flightCardDetails.return.departureTime,
            airlineName: flightCardDetails.return.marketingAirline,
          }
        : null,
  });

  const layoverDetails = await getModalData(flightCard, formData.roundtrip, formData.fromDate, formData.toDate, tripId);

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
        departureDate: formData.toDate,
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

  setFlightId(flightCard, tripId);

  return {
    id: tripId,
    departureFlight,
    returnFlight,
    fare: flightCardDetails.fare,
  } as UnprocessedFlightSearchResult;
};

const setFlightId = (flightCard: HTMLDivElement, id: string) => {
  flightCard.dataset.fpid = id;
  flightCard.dataset.fpVisited = "true";
};
