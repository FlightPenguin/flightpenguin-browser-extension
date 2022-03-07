import { MissingFieldParserError } from "../../shared/errors";
import { sendFlightsEvent } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { scrollToTop } from "../../shared/ui/scrollToTop";
import { stopScrollingCheck, stopScrollingNow } from "../../shared/ui/stopScrolling";
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
const VISITED_FLIGHT_CARD_SELECTOR = "div[data-fpid]";

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
      } else {
        const shouldScroll = shouldScrollToPlaceholder(flightCard);
        if (shouldScroll) {
          scrollToCardOrBottom(flightCard);
        }
      }
      continue;
    }

    const flight = await getFlight({ flightCard, formData });
    flights.push(flight);
    const shoppingId = getShoppingId(flightCard);

    if (flight.id && shoppingId) {
      idToIndexMap[flight.id] = shoppingId;
    }

    lastFlightCard = flightCard;
  }

  if (flights.length) {
    sendFlightsEvent("trip", flights);
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

export const shouldScrollToPlaceholder = (flightCard: HTMLDivElement): boolean => {
  /* Unfortunately, nodes are sometimes deleted and then readded with placeholder values by trip.com as what appears
     to be a rendering performance management tool for them.  So, the flight is updated with new info in their vdom,
     but not in the dom and so we don't get that info.  We should check if the dom has a rendered element that has been
     visited with a higher index than this card.  If so, go scroll to it so the observer says hello...
   */

  const lastVisited = Array.from(
    document.querySelectorAll(VISITED_FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLDivElement>,
  ).slice(-1)[0];
  return (
    !!lastVisited &&
    !!lastVisited.dataset.index &&
    !!flightCard &&
    !!flightCard.dataset.index &&
    Number(lastVisited.dataset.index) > Number(flightCard.dataset.index)
  );
};
