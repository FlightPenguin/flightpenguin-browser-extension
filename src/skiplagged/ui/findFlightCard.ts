import { ParserError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { getLastFlightCard, removeScrollingCheck, stopScrollingNow } from "./scrollThroughContainer";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";

export const findFlightCard = async (skiplaggedFlightId: string): Promise<HTMLElement> => {
  stopScrollingNow("Searching for flight card");
  await pause(300);
  window.scrollTo({ top: 0, behavior: "smooth" });
  await pause(1000);

  const flightSelector = `div[id*='"key":"${skiplaggedFlightId}"']`;
  let flightCard = null;
  let lastFlightCard = getLastFlightCard(document);
  let batchLastFlightCard = null;

  while (lastFlightCard !== batchLastFlightCard) {
    flightCard = document.querySelector(flightSelector) as HTMLElement;
    if (flightCard) {
      break;
    }
    const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
    scrollToFlightCard(batchLastFlightCard);
    await pause(300, 50, 100);
    lastFlightCard = getLastFlightCard(document);
  }

  removeScrollingCheck(null);
  if (flightCard) {
    return flightCard;
  } else {
    throw new ParserError("Could not find flight card");
  }
};
