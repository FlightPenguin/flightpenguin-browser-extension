import { ParserError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { stopScrollingNow } from "./scrollThroughContainer";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";

export const findFlightCard = async (skiplaggedFlightId: string) => {
  stopScrollingNow();
  await pause(300);
  window.scrollTo({ top: 0, behavior: "smooth" });
  await pause(1000);

  const flightSelector = `[id^='${skiplaggedFlightId}|']`;
  let flightCard = null;
  let lastFlightCard = null;
  let batchLastFlightCard = null;

  while (lastFlightCard === null || lastFlightCard !== batchLastFlightCard) {
    lastFlightCard = batchLastFlightCard;
    flightCard = document.querySelector(flightSelector);
    if (flightCard) {
      break;
    }
    const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
    scrollToFlightCard(batchLastFlightCard);
    await pause(300, 50, 100);
  }
  if (flightCard) {
    return flightCard;
  } else {
    debugger;
    throw new ParserError("TODO");
  }
};
