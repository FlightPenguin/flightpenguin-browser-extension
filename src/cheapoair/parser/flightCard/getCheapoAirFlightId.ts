import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";
import { waitForAppearance } from "../../../shared/utilities/waitFor";
import { waitForPageLoad } from "../waitForPageLoad";

const ID_SELECTOR = "div[id*='departTrip']";
const SELECT_FLIGHT_BUTTON_CONTAINER_SELECTOR = "segment[class*='fare-details']";
const PAYMENT_BLOCK_SELECTOR = "div[class*='payment-block']";

export const getCheapoAirFlightId = async (flightCard: HTMLElement, roundtrip: boolean): Promise<string> => {
  return roundtrip ? await getRoundtripId(flightCard) : await getOnewayId(flightCard);
};

const getRoundtripId = async (flightCard: HTMLElement): Promise<string> => {
  const idElement = flightCard.querySelector(ID_SELECTOR) as HTMLDivElement;
  if (!idElement) {
    throw new MissingElementLookupError("Unable to find id element");
  }

  if (!idElement.id) {
    throw new MissingFieldParserError("Unable to extract id from id element");
  }

  return idElement.id.replace("departTrip", "");
};

const getOnewayId = async (flightCard: HTMLElement): Promise<string> => {
  const container = flightCard.querySelector(SELECT_FLIGHT_BUTTON_CONTAINER_SELECTOR) as HTMLElement;
  if (!container) {
    throw new MissingElementLookupError("Unable to find select container");
  }

  container.click();
  await waitForAppearance(30000, PAYMENT_BLOCK_SELECTOR);
  const id = getIdFromUrl();
  if (!id) {
    throw new MissingFieldParserError("Unable to extract id from url");
  }

  history.back();
  await waitForPageLoad();

  return id;
};

const getIdFromUrl = () => {
  const url = new URL(window.location.href);
  return `${url.searchParams.get("locatorkey")}-${url.searchParams.get("cid")}-${url.searchParams.get("cntIndex")}`;
};
