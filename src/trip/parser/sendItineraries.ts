import { MissingFieldParserError } from "../../shared/errors";
import { sendItinerariesEvent } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../shared/types/newtypes/Itinerary";
import { scrollToTop } from "../../shared/ui/scrollToTop";
import { stopScrollingCheck, stopScrollingNow } from "../../shared/ui/stopScrolling";
import { getItinerary } from "./getItinerary";
import { isComplete } from "./isParsingComplete";
import { shouldScrollToPlaceholder } from "./shouldScrollToPlaceholder";

interface SendFlightsProps {
  flightCards: Node[];
  formData: FlightSearchFormData;
}

interface SendFlightsResults {
  complete: boolean;
  idToIndexMap: Record<string, string>;
}

const UNRETRIEVED_SELECTOR = "div.list-placeholder";
const VISITED_FLIGHT_CARD_SELECTOR = "div[data-fpid]";

export const sendItineraries = async ({ flightCards, formData }: SendFlightsProps): Promise<SendFlightsResults> => {
  const itineraries: Itinerary[] = [];
  const idToIndexMap: Record<string, string> = {};

  let lastFlightCard;
  for (const node of flightCards) {
    const flightCard = node as HTMLDivElement;
    const { skip, hide } = shouldSkipCard(flightCard);
    if (skip) {
      if (hide) {
        flightCard.style.display = "none";
        flightCard.dataset.fpVisited = "true";
      } else {
        const shouldScroll = shouldScrollToPlaceholder(flightCard, true);
        if (shouldScroll) {
          scrollToCardOrBottom(flightCard);
        }
      }
      continue;
    }

    const itinerary = await getItinerary({ flightCard, formData });
    itineraries.push(itinerary);
    const shoppingId = getShoppingId(flightCard);

    if (itinerary.getId() && shoppingId) {
      idToIndexMap[itinerary.getId()] = shoppingId;
    }

    lastFlightCard = flightCard;
  }

  if (itineraries.length) {
    sendItinerariesEvent("trip", itineraries);
  }

  if (lastFlightCard) {
    const complete = await isComplete(lastFlightCard);
    if (complete) {
      stopScrollingNow("Reached max flights");
      scrollToTop();
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
  console.log("Scrolling to card");
  flightCard.scrollIntoView({
    behavior: "smooth",
    // puts element at top
    block: "start",
    inline: "nearest",
  });

  const cardBottomPx = window.pageYOffset + flightCard.getBoundingClientRect().bottom;
  if (cardBottomPx >= document.body.scrollHeight * 0.85) {
    console.log("scrolling to bottom");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
};

const getShoppingId = (flightCard: HTMLDivElement): string => {
  const shoppingElement = flightCard.querySelector("div[data-shoppingid]") as HTMLDivElement;
  if (!shoppingElement) {
    throw new MissingFieldParserError("Unable to find shopping id container in flight card");
  }

  if (!shoppingElement.dataset.shoppingid) {
    throw new MissingFieldParserError("Unable to extract shopping id");
  }

  return shoppingElement.dataset.shoppingid;
};
