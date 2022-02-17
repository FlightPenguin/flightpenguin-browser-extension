import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import AirlineMap from "../../shared/nameMaps/airlineMap";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { openFlightDetailsModal } from "../ui/openFlightDetailsModal";
import { openLayoverDetailsCollapsible } from "../ui/openLayoverDetailsCollapsible";
import { getFlightDetailsModal } from "./getFlightDetailsModal";
import { getLayovers } from "./getLayovers";

const AIRLINE_SELECTOR = "[data-test-id='flight-operated']";
const ARRIVAL_TIME_SELECTOR = "[data-test-id='arrival-time']";
const DURATION_SELECTOR = "[data-test-id='journey-duration']";
const ARRIVAL_DEPARTURE_SELECTOR = "div[data-test-id='arrival-departure']";

export const getFlight = async (
  element: Element,
  formData: FlightSearchFormData,
  isReturn: boolean,
): Promise<FlightDetails> => {
  const { marketingAirline, operatingAirline } = getAirlines(element);
  const { departureTime, arrivalTime } = getFlightTimes(element);
  const { duration, hasStops } = getDurationDetails(element);
  const { departureAirport, arrivalAirport } = getArrivalAndDepartureAirports(element);

  openFlightDetailsModal(element);
  const modal = await getFlightDetailsModal();
  await openLayoverDetailsCollapsible(modal);

  const flightSegments = hasStops
    ? await getLayovers(modal, 3000, formData, isReturn)
    : [
        new FlightLeg({
          fromTime: departureTime,
          toTime: arrivalTime,
          from: departureAirport,
          to: arrivalAirport,
          duration: duration,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          operatingAirline: marketingAirline || operatingAirline,
        }),
      ];

  return new FlightDetails({
    departureDate: isReturn ? formData.toDate : formData.fromDate,
    marketingAirline,
    operatingAirline,
    fromTime: departureTime,
    toTime: arrivalTime,
    duration,
    layovers: flightSegments,
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
    // operatingAirlineContainer = airlineContainer.childNodes[1] as HTMLElement;
    operatingAirlineContainer = null;
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

const getArrivalAndDepartureAirports = (flightCard: Element): { departureAirport: string; arrivalAirport: string } => {
  const textContainer = flightCard.querySelector(ARRIVAL_DEPARTURE_SELECTOR) as HTMLDivElement;
  if (!textContainer) {
    throw new MissingElementLookupError("Unable to lookup arrival/departure container in flight card");
  }

  const rawText = textContainer.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract text from arrival/departure container");
  }

  const [trash, departureish, arrivalish] = rawText.split("(");
  const departureAirport = departureish.split(")")[0].trim();
  const arrivalAirport = arrivalish.split(")")[0].trim();
  return { departureAirport, arrivalAirport };
};
