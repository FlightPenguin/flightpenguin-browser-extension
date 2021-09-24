import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { waitForAppearance } from "../../shared/utilities/waitFor";

const FLIGHT_CARDS_CONTAINER_SELECTOR = "div[class*='ResultsUpdateTransitionStyles']";

export const getFlightContainer = async (): Promise<HTMLDivElement> => {
  const wrapper = (await waitForAppearance(45000, FLIGHT_CARDS_CONTAINER_SELECTOR)) as HTMLDivElement;
  if (wrapper.childElementCount !== 1) {
    throw new MissingFieldParserError(`Unexpected children of flight container wrapper`);
  }

  return wrapper.children[0] as HTMLDivElement;
};
