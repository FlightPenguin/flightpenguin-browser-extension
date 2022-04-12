import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";
import { getParsedModalHtml } from "../../../shared/parser/modal/getParsedModalHtml";
import { TripComponentInput } from "../../../shared/types/TripComponent";
import { getKiwiFlightId } from "../../shared/getKiwiFlightId";
import { setModalHtml } from "../../ui/setModalHtml";
import { getTrip } from "./getTrip";

interface GetTripsProps {
  flightCard: HTMLDivElement;
  roundtrip: boolean;
}

const TRIP_CONTAINER_SELECTOR = "[data-test='TripPopupWrapper']";

export const getTripComponentInputs = async ({
  flightCard,
  roundtrip,
}: GetTripsProps): Promise<TripComponentInput[][]> => {
  const kiwiId = getKiwiFlightId(flightCard);

  await setModalHtml(flightCard, kiwiId);
  const modal = getParsedModalHtml(kiwiId, "BOTH");

  const tripSections = getTripContainers(modal, roundtrip);
  return tripSections.map((tripSection) => {
    return getTrip(tripSection);
  });
};

const getTripContainers = (modal: Document, roundtrip: boolean): HTMLDivElement[] => {
  const tripSections = modal.querySelectorAll(TRIP_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (!tripSections) {
    throw new MissingElementLookupError("Unable to find trip containers in modal");
  }

  if (!tripSections.length) {
    throw new MissingFieldParserError("No trip sections present");
  }

  const expectedQuantity = roundtrip ? 2 : 1;
  if (tripSections.length !== expectedQuantity) {
    throw new MissingFieldParserError(`Expected ${expectedQuantity} trip sections, found ${tripSections.length}`);
  }

  return Array.from(tripSections);
};
