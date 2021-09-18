import { FlightType } from "../../background/constants";
import { MissingElementLookupError } from "../../shared/errors";
import { sendNoFlightsEvent } from "../../shared/events";
import { pause } from "../../shared/pause";
import { isVisible } from "../../shared/utilities/isVisible";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { disableHiddenCitySearches } from "./disableHiddenCitySearches";
import { scrollToFlightCard } from "./scrollToFlightCard";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const NO_RESULTS_SELECTOR = ".trip-list-empty";
const FLIGHT_CARD_SELECTOR = "div[class='trip']";
const LOADING_SELECTOR = "div.spinner-title";
const STOP_SCROLLING_ID = "stop-scrolling";
const STOP_SCROLLING_SELECTOR = `div#${STOP_SCROLLING_ID}`;
const RETURN_HEADER_SELECTOR = ".trip-return-header";

export const scrollThroughContainer = async (container: HTMLElement, flightType: FlightType): Promise<void> => {
  await waitForFlightLoad(container, flightType);
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

const waitForFlightLoad = async (container: HTMLElement, flightType: FlightType) => {
  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(10000, SORT_BUTTON_SELECTOR);
  await waitForDisappearance(15000, LOADING_SELECTOR);
  await waitForAppearance(15000, FLIGHT_CARD_SELECTOR, container);
  if (flightType === "RETURN") {
    await waitForAppearance(10000, RETURN_HEADER_SELECTOR);
    await pause(250);
  }

  disableHiddenCitySearches();

  if (isNoResults(flightType)) {
    sendNoFlightsEvent("skiplagged", flightType);
  }
};

const isNoResults = (flightType: FlightType) => {
  const noResultsDiv = document.querySelector(NO_RESULTS_SELECTOR) as HTMLDivElement;
  if (!noResultsDiv) {
    if (flightType === "RETURN") {
      return false;
    }
    throw new MissingElementLookupError("Unable to find the no results container");
  }

  return isVisible(noResultsDiv);
};
