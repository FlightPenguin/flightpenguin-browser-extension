import { waitForDisappearance } from "../utilities/waitFor";

const STOP_SCROLLING_ID = "stop-scrolling";
const STOP_SCROLLING_SELECTOR = `div#${STOP_SCROLLING_ID}`;

export const stopScrollingCheck = async (remove: boolean): Promise<boolean> => {
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
