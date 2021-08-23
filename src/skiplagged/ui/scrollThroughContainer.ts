import { pause } from "../../shared/pause";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";
const PROGRESS_SELECTOR = ".ui-mprogress";
const STOP_SCROLLING_ID = "stop-scrolling";
const STOP_SCROLLING_SELECTOR = `div#${STOP_SCROLLING_ID}`;

export const scrollThroughContainer = async (container: HTMLElement): Promise<void> => {
  await waitForDisappearance(45000, PROGRESS_SELECTOR);
  await waitForAppearance(45000, FLIGHT_CARD_SELECTOR, container);
  removeScrollingCheck(null);

  const startTime = new Date().getTime();
  while (getTimeSinceStart(startTime) < 60000) {
    if (stopScrollingCheck(true)) {
      break;
    }
    await progressiveScrollingOnce(container);
    await pause(300, 100, 200);
  }
};

const progressiveScrollingOnce = async (flightContainer: HTMLElement): Promise<void> => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  await pause(1000, 100, 200);

  let lastFlightCard = null;
  let batchLastFlightCard = null;
  while (lastFlightCard === null || lastFlightCard !== batchLastFlightCard) {
    if (stopScrollingCheck(false)) {
      break;
    }
    lastFlightCard = batchLastFlightCard;
    const flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
    scrollToFlightCard(batchLastFlightCard);
    if (stopScrollingCheck(false)) {
      break;
    }
    await pause(300, 50, 100);
  }
};

const getTimeSinceStart = (startTime: number) => {
  const currentTime = new Date().getTime();
  return currentTime - startTime;
};

const stopScrollingCheck = (remove: boolean): boolean => {
  const div = document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement;
  const stopScrolling = !!div;
  if (stopScrolling && remove) {
    removeScrollingCheck(div);
  }
  return stopScrolling;
};

export const stopScrollingNow = (): void => {
  const div = document.createElement("div");
  div.id = STOP_SCROLLING_ID;
  document.body.appendChild(div);
};

export const removeScrollingCheck = (div: HTMLElement | null): void => {
  const element = div ? div : (document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement);
  if (element) {
    element.remove();
  }
};
