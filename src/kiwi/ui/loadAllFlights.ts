import { MissingFieldParserError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { waitForDisappearance } from "../../shared/utilities/waitFor";
import { getFlightContainer } from "../parser/getFlightContainer";

const LOADER_SELECTOR = "div[class*='ResultListLoader']";

export const loadAllFlights = async () => {
  scrollToBottom();

  let exhausted = false;
  const startTime = new Date();
  let timeSinceStarted = 0;
  while (!exhausted && timeSinceStarted < 60000) {
    console.debug(timeSinceStarted);
    const flightContainer = await getFlightContainer();
    await waitForLoaderDisappearance();
    scrollToBottom();
    await pause(500);
    scrollToBottom();
    const showMoreButton = getShowMoreButton(flightContainer);
    if (!showMoreButton) {
      exhausted = true;
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
    throw new MissingFieldParserError("Unable to extract text from last flight container button");
  }

  return buttonText.toLowerCase().includes("load more") ? button : null;
};
