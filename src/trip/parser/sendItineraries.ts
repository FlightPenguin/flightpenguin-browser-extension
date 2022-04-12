import { sendItinerariesEvent } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../shared/types/Itinerary";
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
}

const UNRETRIEVED_SELECTOR = "div.list-placeholder";

export const sendItineraries = async ({ flightCards, formData }: SendFlightsProps): Promise<SendFlightsResults> => {
  const itineraries: Itinerary[] = [];

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
          await scrollToCardOrBottom(flightCard);
        }
      }
      continue;
    }

    const itinerary = await getItinerary({ flightCard, formData });
    itineraries.push(itinerary);

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
    return { complete };
  }
  return { complete: false };
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
