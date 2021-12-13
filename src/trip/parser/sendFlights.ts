import { sendFlightsEvent } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { stopScrollingCheck, stopScrollingNow } from "../ui/stopScrolling";
import { getFlight } from "./getFlight";
import { isComplete } from "./isParsingComplete";

interface SendFlightsProps {
  flightCards: Node[];
  formData: FlightSearchFormData;
}

interface SendFlightsResults {
  complete: boolean;
  idToIndexMap: Record<string, string>;
}

const UNRETRIEVED_SELECTOR = "div.list-placeholder";

export const sendFlights = async ({ flightCards, formData }: SendFlightsProps): Promise<SendFlightsResults> => {
  const flights: UnprocessedFlightSearchResult[] = [];
  const idToIndexMap: Record<string, string> = {};

  let lastFlightCard;
  for (const node of flightCards) {
    const flightCard = node as HTMLDivElement;
    const { skip, hide } = shouldSkipCard(flightCard);
    if (skip) {
      if (hide) {
        flightCard.style.display = "none";
        flightCard.dataset.fpVisited = "true";
      }
      continue;
    }

    const flight = await getFlight({ flightCard, formData });
    flights.push(flight);
    if (flight.id && flightCard.dataset.index) {
      idToIndexMap[flight.id] = flightCard.dataset.index;
    }

    lastFlightCard = flightCard;
  }

  if (flights.length) {
    sendFlightsEvent("trip", flights);
  }

  if (lastFlightCard) {
    const complete = isComplete(lastFlightCard);
    if (complete) {
      stopScrollingNow("Reached max flights");
    } else {
      await scrollToCardOrBottom(lastFlightCard);
    }
    return { complete, idToIndexMap };
  }
  return { complete: false, idToIndexMap };
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

const scrollToCardOrBottom = async (flightCard: HTMLDivElement): Promise<void> => {
  if (await stopScrollingCheck(false)) {
    return;
  }
  flightCard.scrollIntoView({ behavior: "smooth" });

  const cardBottomPx = window.pageYOffset + flightCard.getBoundingClientRect().bottom;
  if (cardBottomPx >= document.body.scrollHeight * 0.9) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
};
