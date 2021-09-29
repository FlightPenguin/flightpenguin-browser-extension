import { MissingFieldParserError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { waitForDisappearance } from "../../shared/utilities/waitFor";
import { getFlightContainer } from "../parser/getFlightContainer";

const LOADER_SELECTOR = "div[class*='ResultListLoader']";
const STOP_SCROLLING_ID = "stop-scrolling";
const STOP_SCROLLING_SELECTOR = `div#${STOP_SCROLLING_ID}`;

export const loadAllFlights = async () => {
  scrollToBottom();

  let exhausted = false;
  const startTime = new Date();
  let timeSinceStarted = 0;
  while (!exhausted && timeSinceStarted < 90000) {
    console.debug(timeSinceStarted);
    if (await stopScrollingCheck(false)) {
      break;
    }
    const flightContainer = await getFlightContainer();
    await waitForLoaderDisappearance();
    if (await stopScrollingCheck(false)) {
      break;
    }
    scrollToBottom();
    await pause(500);
    scrollToBottom();
    const showMoreButton = getShowMoreButton(flightContainer);
    if (!showMoreButton) {
      exhausted = true;
      break;
    }
    if (await stopScrollingCheck(false)) {
      break;
    }
    showMoreButton.click();
    await pause(500);
    timeSinceStarted = Math.abs(startTime.valueOf() - new Date().valueOf());
  }
  console.debug("Scrolling complete");
};

const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

const waitForLoaderDisappearance = async () => {
  try {
    await waitForDisappearance(60000, LOADER_SELECTOR);
  } catch (e) {
    console.debug("Waiting for loader failed, ending kiwi flight loading");
  }
};

const getShowMoreButton = (flightContainer: HTMLDivElement): HTMLButtonElement | null => {
  const button = Array.from(flightContainer.querySelectorAll("button")).slice(-1)[0] as HTMLButtonElement;
  const buttonText = button.textContent;
  if (!buttonText) {
    console.debug("Unable to extract text from last flight container button");
    return null;
  }

  return buttonText.toLowerCase().includes("load more") ? button : null;
};

const stopScrollingCheck = async (remove: boolean): Promise<boolean> => {
  const div = document.querySelector(STOP_SCROLLING_SELECTOR) as HTMLDivElement;
  const stopScrolling = !!div;

  if (stopScrolling) {
    console.debug(`Stopping scrolling due to ${div.dataset.reason}`);
  }

  if (stopScrolling && remove) {
    await removeScrollingCheck();
  }
  return stopScrolling;
};

export const removeScrollingCheck = async (): Promise<void> => {
  const elements = document.querySelectorAll(STOP_SCROLLING_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (elements.length) {
    elements.forEach((element) => element.remove());
  }
  await waitForDisappearance(5000, STOP_SCROLLING_SELECTOR);
};

export const stopScrollingNow = (reason: string): void => {
  const div = document.createElement("div");
  div.id = STOP_SCROLLING_ID;
  div.dataset.reason = reason;
  document.body.appendChild(div);
};
