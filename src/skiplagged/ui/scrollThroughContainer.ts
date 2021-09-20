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
    if (await stopScrollingCheck(true)) {
      break;
    }
    await progressiveScrollingOnce(container);
    await pause(500);
  }
};

const progressiveScrollingOnce = async (flightContainer: HTMLElement): Promise<void> => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  await pause(1250);

  let lastFlightCard = getLastFlightCard(flightContainer);
  let batchLastFlightCard = null;
  while (lastFlightCard !== batchLastFlightCard) {
    if (await stopScrollingCheck(false)) {
      break;
    }
    const flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
    scrollToFlightCard(batchLastFlightCard);
    if (await stopScrollingCheck(false)) {
      break;
    }
    await pause(750);
    lastFlightCard = getLastFlightCard(flightContainer);
  }
};

const getTimeSinceStart = (startTime: number) => {
  const currentTime = new Date().getTime();
  return currentTime - startTime;
};

const stopScrollingCheck = async (remove: boolean): Promise<boolean> => {
  const div = document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement;
  const stopScrolling = !!div;

  if (stopScrolling) {
    console.debug(`Stopping scrolling due to ${div.dataset.reason}`);
  }

  if (stopScrolling && remove) {
    await removeScrollingCheck(div);
  }
  return stopScrolling;
};

export const stopScrollingNow = (reason: string): void => {
  const div = document.createElement("div");
  div.id = STOP_SCROLLING_ID;
  div.dataset.reason = reason;
  document.body.appendChild(div);
};

export const removeScrollingCheck = async (div: HTMLElement | null): Promise<void> => {
  const element = div ? div : (document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement);
  if (element) {
    element.remove();
  }
  await waitForDisappearance(5000, STOP_SCROLLING_SELECTOR);
};

export const getLastFlightCard = (container: HTMLElement | Document): HTMLElement => {
  return Array.from(container.querySelectorAll(FLIGHT_CARD_SELECTOR)).slice(-1)[0] as HTMLElement;
};
