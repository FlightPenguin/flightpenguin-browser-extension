import { sendFlightsEvent } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { stopScrollingCheck } from "../ui/stopScrolling";
import { getFlight } from "./getFlight";
import { isComplete } from "./isParsingComplete";

interface SendFlightsProps {
  flightCards: Node[];
  formData: FlightSearchFormData;
}

const UNRETRIEVED_SELECTOR = "div.list-placeholder";

export const sendFlights = async ({ flightCards, formData }: SendFlightsProps): Promise<boolean> => {
  const flights: UnprocessedFlightSearchResult[] = [];

  for (const node of flightCards) {
    const flightCard = node as HTMLDivElement;
    const { skip, hide } = shouldSkipCard(flightCard);
    if (skip) {
      if (hide) {
        flightCard.style.display = "none";
        flightCard.dataset.visited = "true";
      }
      continue;
    }

    const flight = await getFlight({ flightCard, formData });
    flights.push(flight);
  }

  if (flights.length) {
    sendFlightsEvent("trip", flights);
  }

  const lastFlightCard = Array.from(flightCards as HTMLDivElement[]).slice(-1)[0];
  const complete = isComplete(lastFlightCard);
  if (!complete) {
    scrollToCardOrBottom(lastFlightCard);
  }
  return complete;
};

const shouldSkipCard = (flightCard: HTMLDivElement): { skip: boolean; hide: boolean } => {
  if (!flightCard.dataset.flightId) {
    return { skip: true, hide: true };
  }
  if (flightCard.querySelector(UNRETRIEVED_SELECTOR)) {
    return { skip: true, hide: false };
  }
  return { skip: false, hide: false };
};

const scrollToCardOrBottom = (flightCard: HTMLDivElement): void => {
  if (stopScrollingCheck(false)) {
    return;
  }
  flightCard.scrollIntoView({ behavior: "smooth" });

  const cardBottomPx = window.pageYOffset + flightCard.getBoundingClientRect().bottom;
  if (cardBottomPx >= document.body.scrollHeight * 0.9) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
};
