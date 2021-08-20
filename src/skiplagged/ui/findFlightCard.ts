import { ParserError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";

export const findFlightCard = async (skiplaggedFlightId: string) => {
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
    // TODO:
    throw new ParserError("TODO: ");
  }
};
