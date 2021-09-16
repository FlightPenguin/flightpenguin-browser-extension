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
  await pause(150);

  const startTime = new Date().getTime();
  while (getTimeSinceStart(startTime) < 60000) {
    if (stopScrollingCheck(false)) {
      console.debug("Stop scrolling requested...");
      break;
    }
    await progressiveScrollingOnce(container);
    await pause(300, 100, 200);
  }
};

const progressiveScrollingOnce = async (flightContainer: HTMLElement): Promise<void> => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  await pause(2000, 100, 300);

  let lastFlightCard = getLastFlightCard(flightContainer);
  let batchLastFlightCard = null;
  while (lastFlightCard !== batchLastFlightCard) {
    if (stopScrollingCheck(false)) {
      break;
    }
    const flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
    scrollToFlightCard(batchLastFlightCard);
    if (stopScrollingCheck(false)) {
      break;
    }
    await pause(500, 50, 100);
    lastFlightCard = getLastFlightCard(flightContainer);
  }
};

const getTimeSinceStart = (startTime: number) => {
  const currentTime = new Date().getTime();
  return currentTime - startTime;
};

const stopScrollingCheck = (remove: boolean): boolean => {
  const div = document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement;
  const stopScrolling = !!div;
  if (stopScrolling) {
    console.debug(`Stopping scrolling because ${div.getAttribute("data-reason")}`);
  }
  if (stopScrolling && remove) {
    removeScrollingCheck(div);
  }
  return stopScrolling;
};

export const stopScrollingNow = (reason?: string): void => {
  const div = document.createElement("div");
  div.id = STOP_SCROLLING_ID;
  if (reason) {
    div.setAttribute("data-reason", reason);
  }
  document.body.appendChild(div);
};

export const removeScrollingCheck = (div: HTMLElement | null): void => {
  const element = div ? div : (document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement);
  if (element) {
    element.remove();
  }
};

export const getLastFlightCard = (container: HTMLElement | Document): HTMLElement => {
  return Array.from(container.querySelectorAll(FLIGHT_CARD_SELECTOR)).slice(-1)[0] as HTMLElement;
};
