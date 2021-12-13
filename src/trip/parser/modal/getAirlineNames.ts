import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const AIRLINE_NAME_SELECTOR = "div.flight-detail-airline__name";

export const getAirlineNames = (container: HTMLDivElement): { marketingAirlineName: string } => {
  const nameContainer = container.querySelector(AIRLINE_NAME_SELECTOR);
  if (!nameContainer) {
    throw new MissingElementLookupError("Unable to find flight leg airline name container");
  }

  const airlineName = nameContainer.childNodes[0].textContent;
  if (!airlineName) {
    throw new MissingFieldParserError("Unable to extract flight leg marketing airline name");
  }
  return { marketingAirlineName: airlineName };
};
