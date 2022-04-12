import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const FLIGHT_SEGMENT_AIRLINE_CONTAINER_SELECTOR = "div[class*='SectorFlightCarrier']";

export const getAirlineName = (flightSegmentContainer: HTMLDivElement): string => {
  const container = flightSegmentContainer.querySelector(FLIGHT_SEGMENT_AIRLINE_CONTAINER_SELECTOR);
  if (!container) {
    throw new MissingElementLookupError("Unable to find airline container");
  }

  const image = container.querySelector("img");
  if (!image) {
    throw new MissingElementLookupError("Unable to locate image in airline container");
  }

  let airlineName = image.title || image.alt;
  if (!airlineName) {
    throw new MissingFieldParserError("Unable to extract airline name");
  }

  if (airlineName === "WN") {
    airlineName = "Southwest Airlines";
  }

  return airlineName;
};
