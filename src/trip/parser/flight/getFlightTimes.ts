import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";
import { getFormatted12HourClockTimeFrom24HourClockTime } from "../../../shared/utilities/getFormatted12HourClockTimeFrom24HourClockTime";

const FLIGHT_TIME_CONTAINER_SELECTOR = "div.flight-info-airline__timer";

export const getFlightTimes = (container: HTMLDivElement): { arrivalTime: string; departureTime: string } => {
  const timeContainer = container.querySelector(FLIGHT_TIME_CONTAINER_SELECTOR);
  if (!timeContainer) {
    throw new MissingElementLookupError("Unable to find flight time container");
  }

  const rawText = timeContainer.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to obtain flight time container text");
  }

  const tokens = rawText.replaceAll(/\s+/g, "").split("-");
  if (tokens.length !== 2) {
    throw new MissingFieldParserError(`Unable to extract tokens from ${rawText}`);
  }

  return {
    departureTime: getFormatted12HourClockTimeFrom24HourClockTime(tokens[0]),
    arrivalTime: getFormatted12HourClockTimeFrom24HourClockTime(tokens[1]),
  };
};
