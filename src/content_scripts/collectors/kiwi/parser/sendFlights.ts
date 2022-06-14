import { sendItinerariesEvent } from "../../../../shared/events";
import { getNextVisibleSibling } from "../../../../shared/parser/getNextVisibleSibling";
import { pause } from "../../../../shared/pause";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../../../shared/types/Itinerary";
import { stopScrollingCheck, stopScrollingNow } from "../../../../shared/ui/stopScrolling";
import { getItinerary } from "./getItinerary";
import { isComplete } from "./isParsingComplete";

interface SendFlightsProps {
  flightCards: Node[];
  formData: FlightSearchFormData;
}

interface SendFlightsResults {
  complete: boolean;
}

export const sendFlights = async ({ flightCards, formData }: SendFlightsProps): Promise<SendFlightsResults> => {
  const itineraries: Itinerary[] = [];

  let lastFlightCard;
  for (const node of flightCards) {
    const flightCard = node as HTMLDivElement;
    if (shouldSkipCard(flightCard)) {
      flightCard.style.display = "none";
      flightCard.dataset.fpVisited = "true";

      lastFlightCard = flightCard;
      continue;
    }

    const itin = await getItinerary({ flightCard, formData });
    itineraries.push(itin);

    lastFlightCard = flightCard;
  }

  if (itineraries.length) {
    sendItinerariesEvent("kiwi", itineraries);
  }

  if (lastFlightCard) {
    const complete = await isComplete(lastFlightCard);
    if (complete) {
      stopScrollingNow("Reached max flights");
    } else {
      await scrollToCard(lastFlightCard);
    }
    return { complete };
  }
  return { complete: false };
};

const shouldSkipCard = (flightCard: HTMLDivElement): boolean => {
  const denyListTerms = ["travel hack", "no-checked-bag", "no baggage"];
  const ignoreIfMissing = ["show details"];

  return (
    denyListTerms.some((term) => flightCard.textContent?.toLowerCase().includes(term)) ||
    ignoreIfMissing.some((term) => !flightCard.textContent?.toLowerCase().includes(term))
  );
};

const scrollToCard = async (flightCard: HTMLDivElement): Promise<void> => {
  if (await stopScrollingCheck(false)) {
    return;
  }

  const nextCard = getNextVisibleSibling(flightCard);
  const scrollToCard = nextCard ? nextCard : flightCard;

  if (scrollToCard.getBoundingClientRect().y > 0) {
    // NOTE: getBoundingClientRect().y returns negative numbers if above the current viewport...
    if (scrollToCard.dataset.test === "ResultCardPlaceholder") {
      const halfHeight = window.innerHeight / 2;

      // jitter and skitter to activate kiwi's scroll handler
      if (!(await stopScrollingCheck(false))) {
        window.scrollBy(0, window.innerHeight);
        await pause(250);
      }
      if (!(await stopScrollingCheck(false))) {
        window.scrollBy(0, halfHeight * -1);
        await pause(250);
      }
      if (!(await stopScrollingCheck(false))) {
        window.scrollBy(0, halfHeight);
      }
    } else {
      if (!(await stopScrollingCheck(false))) {
        scrollToCard.scrollIntoView({
          behavior: "smooth",
          // puts element at top
          block: "start",
          inline: "nearest",
        });
      }
    }
  }
};
