import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import AirlineMap from "../../shared/nameMaps/airlineMap";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { openFlightDetailsModal } from "../ui/openFlightDetailsModal";
import { openLayoverDetailsCollapsible } from "../ui/openLayoverDetailsCollapsible";
import { getFlightDetailsModal } from "./getFlightDetailsModal";
import { getLayovers } from "./getLayovers";

const AIRLINE_SELECTOR = "[data-test-id='flight-operated']";
const ARRIVAL_TIME_SELECTOR = "[data-test-id='arrival-time']";
const DURATION_SELECTOR = "[data-test-id='journey-duration']";

export const getFlight = async (element: Element, formData: FlightSearchFormData): Promise<FlightDetails> => {
  const { marketingAirline, operatingAirline } = getAirlines(element);
  const { departureTime, arrivalTime } = getFlightTimes(element);
  const { duration, hasStops } = getDurationDetails(element);

  openFlightDetailsModal(element);
  const modal = await getFlightDetailsModal();
  await openLayoverDetailsCollapsible(modal);
  const layovers = hasStops ? await getLayovers(modal, 3000, formData) : [];

  return new FlightDetails({
    marketingAirline,
    operatingAirline,
    fromTime: departureTime,
    toTime: arrivalTime,
    duration,
    layovers,
  });
};

const getAirlines = (element: Element) => {
  const airlineContainer: HTMLElement = element.querySelector(AIRLINE_SELECTOR) as HTMLElement;

  if (!airlineContainer) {
    throw new MissingElementLookupError("Unable to lookup marketing airline");
  }

  let marketingAirlineContainer;
  let operatingAirlineContainer;
  if (airlineContainer.childNodes.length > 1) {
    // "Delta"
    // "• Delta 4164 operated by Skywest DBA Delta Connection"
    marketingAirlineContainer = airlineContainer.childNodes[0] as HTMLElement;
    operatingAirlineContainer = airlineContainer.childNodes[1] as HTMLElement;
  } else {
    marketingAirlineContainer = airlineContainer;
    operatingAirlineContainer = null;
  }

  const marketingAirlineName = AirlineMap.getAirlineName(marketingAirlineContainer.textContent);
  const operatingAirlineName = operatingAirlineContainer
    ? operatingAirlineContainer.textContent?.split(/\s+operated\s+by\s+/)[1]
    : null;

  return { marketingAirline: marketingAirlineName, operatingAirline: operatingAirlineName };
};

const getFlightTimes = (flightContainer: Element) => {
  const element = flightContainer.querySelector(ARRIVAL_TIME_SELECTOR);

  if (!element) {
    throw new MissingElementLookupError("Unable to lookup flight arrival time");
  }

  const [departureTime, arrivalTime] = element.textContent?.split(" - ") || [null, null];

  if (!departureTime) {
    throw new MissingFieldParserError("Unable to determine departure time for flight");
  }

  if (!arrivalTime) {
    throw new MissingFieldParserError("Unable to determine arrival time for flight");
  }

  return { arrivalTime: standardizeTimeString(arrivalTime), departureTime: standardizeTimeString(departureTime) };
};

const getDurationDetails = (flightContainer: Element) => {
  const element = flightContainer.querySelector(DURATION_SELECTOR);

  if (!element) {
    throw new MissingElementLookupError("Unable to lookup flight duration time");
  }

  const duration = element.textContent?.split("(")[0].trim();
  const hasStops = !(element.textContent?.includes("Nonstop") || false);

  if (!duration) {
    throw new MissingFieldParserError("Unable to determine duration time for flight");
  }

  return { duration, hasStops };
};
