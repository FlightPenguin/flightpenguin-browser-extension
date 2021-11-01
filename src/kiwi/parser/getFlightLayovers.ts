import { format, parseISO } from "date-fns";

import { FlightType } from "../../background/constants";
import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { AirportDetails } from "../../shared/types/AirportDetails";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getExcessDays } from "../shared/getExcessDays";

const FLIGHT_CONTAINER_SELECTOR = "[data-test='TripPopupWrapper']";
const FLIGHT_SEGMENT_CONTAINER_SELECTOR = "div[class*='SectorGridWrapper']";
const FLIGHT_SEGMENT_TIME_CONTAINER_SELECTOR = "div[class*='SectorTime']";
const FLIGHT_SEGMENT_AIRLINE_CONTAINER_SELECTOR = "div[class*='SectorFlightCarrier']";
const FLIGHT_SEGMENT_DURATION_CONTAINER_SELECTOR = "div[class*='SectorFlightCell']";
const FLIGHT_SEGMENT_AIRPORT_CONTAINER_SELECTOR = "div[class*='SectorPlace']";
const FLIGHT_SEGMENT_AIRPORT_CITY_NAME_SELECTOR = "[class*='SectorPlaceText']";
const FLIGHT_SEGMENT_AIRPORT_NAME_SELECTOR = "p[class*='StyledText']";

const AIRPORT_REGEX = /(?<airportName>.*)\s+\((?<airportCode>[A-Za-z0-9]{3})\)/;

interface KiwiDetailedFlightSegment {
  arrivalAirport: AirportDetails;
  arrivalTime: Date;
  departureAirport: AirportDetails;
  departureTime: Date;
  durationInterval: string;
  durationText: string;
  operatingAirline: string;
}

export const getFlightLayovers = (modal: HTMLDivElement, flightType: FlightType): FlightLeg[] => {
  const legSection = getLegSection(modal, flightType);
  const flightSegments = getFlightSegments(legSection);

  let previousFlightSegment: KiwiDetailedFlightSegment;
  return flightSegments.map((flightSegment) => {
    const departureTime = getFormattedDepartureTime(flightSegment.departureTime, previousFlightSegment);
    const arrivalTime = getFormattedArrivalTime(flightSegment.departureTime, flightSegment.arrivalTime);

    const flightLeg = new FlightLeg({
      from: flightSegment.departureAirport.code,
      fromTime: departureTime,
      to: flightSegment.arrivalAirport.code,
      toTime: arrivalTime,
      operatingAirline: flightSegment.operatingAirline,
      duration: flightSegment.durationText,
    });
    previousFlightSegment = flightSegment;
    return flightLeg;
  });
};

const getLegSection = (modal: HTMLDivElement, flightType: FlightType): HTMLDivElement => {
  const index = flightType === "RETURN" ? 1 : 0;
  const legsSections = modal.querySelectorAll(FLIGHT_CONTAINER_SELECTOR);
  if (legsSections.length !== 2) {
    throw new MissingElementLookupError("Unable to locate leg sections properly");
  }
  return legsSections[index] as HTMLDivElement;
};

const getFlightSegments = (legSection: HTMLDivElement) => {
  const flightSegmentContainers = legSection.querySelectorAll(
    FLIGHT_SEGMENT_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLDivElement>;
  if (!flightSegmentContainers.length) {
    throw new MissingElementLookupError("Unable to locate flight segment containers");
  }

  return Array.from(flightSegmentContainers)
    .filter((flightSegmentContainer, index) => {
      if (index % 2 === 0) {
        return flightSegmentContainer;
      }
    })
    .map((flightSegmentContainer) => {
      return getFlightSegment(flightSegmentContainer);
    });
};

const getFlightSegment = (flightSegmentContainer: HTMLDivElement): KiwiDetailedFlightSegment => {
  const { departureTime, arrivalTime } = getFlightSegmentTimes(flightSegmentContainer);
  const operatingAirline = getAirlineName(flightSegmentContainer);
  const { durationText, durationInterval } = getDuration(flightSegmentContainer);
  const { departureAirport, arrivalAirport } = getFlightSegmentAirports(flightSegmentContainer);
  return {
    arrivalAirport,
    arrivalTime,
    departureAirport,
    departureTime,
    durationInterval,
    durationText,
    operatingAirline,
  };
};

const getFlightSegmentTimes = (flightSegmentContainer: HTMLDivElement): { departureTime: Date; arrivalTime: Date } => {
  const timeElements = flightSegmentContainer.querySelectorAll(
    FLIGHT_SEGMENT_TIME_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLDivElement>;
  if (timeElements.length !== 2) {
    throw new MissingElementLookupError("Unable to find flight segment time cells");
  }

  const [departureTimeContainer, arrivalTimeContainer] = timeElements;

  return {
    departureTime: getDateTimeFromWrapper(departureTimeContainer),
    arrivalTime: getDateTimeFromWrapper(arrivalTimeContainer),
  };
};

const getDateTimeFromWrapper = (container: HTMLDivElement): Date => {
  const timeElement = container.querySelector("time") as HTMLTimeElement;
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to find segment datetime element");
  }
  return parseISO(timeElement.dateTime);
};

const getAirlineName = (flightSegmentContainer: HTMLDivElement): string => {
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

const getDuration = (flightSegmentContainer: HTMLDivElement): { durationText: string; durationInterval: string } => {
  const container = flightSegmentContainer.querySelector(FLIGHT_SEGMENT_DURATION_CONTAINER_SELECTOR);
  if (!container) {
    throw new MissingElementLookupError("Unable to find duration container");
  }

  const timeElement = container.querySelector("time") as HTMLTimeElement;
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to locate duration datetime element");
  }

  const durationText = timeElement.textContent;
  if (!durationText) {
    throw new MissingFieldParserError("Unable to extract duration");
  }

  const durationInterval = timeElement.dateTime;
  if (!durationInterval) {
    throw new MissingFieldParserError("Unable to extract duration interval");
  }

  return { durationText, durationInterval };
};

const getFlightSegmentAirports = (
  flightSegmentContainer: HTMLDivElement,
): { departureAirport: AirportDetails; arrivalAirport: AirportDetails } => {
  const airportContainers = flightSegmentContainer.querySelectorAll(
    FLIGHT_SEGMENT_AIRPORT_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLDivElement>;
  if (airportContainers.length !== 2) {
    throw new MissingElementLookupError("Unable to find flight segment airport cells");
  }

  const [departureAirportContainer, arrivalAirportContainer] = airportContainers;

  return {
    departureAirport: getAirportDetails(departureAirportContainer),
    arrivalAirport: getAirportDetails(arrivalAirportContainer),
  };
};

const getAirportDetails = (airportContainer: HTMLDivElement): AirportDetails => {
  const city = getAirportCity(airportContainer);
  const { name, code } = getAirport(airportContainer);

  return { city, name, code };
};

const getAirportCity = (airportContainer: HTMLDivElement): string => {
  const cityContainer = airportContainer.querySelector(FLIGHT_SEGMENT_AIRPORT_CITY_NAME_SELECTOR);
  if (!cityContainer) {
    throw new MissingElementLookupError("Unable to find city container");
  }

  const city = cityContainer.textContent;
  if (!city) {
    throw new MissingFieldParserError("Unable to extract city name");
  }

  return city;
};

const getAirport = (airportContainer: HTMLDivElement): { name: string; code: string } => {
  const airportNameContainer = airportContainer.querySelector(FLIGHT_SEGMENT_AIRPORT_NAME_SELECTOR);
  if (!airportNameContainer) {
    throw new MissingElementLookupError("Unable to find airport name container");
  }

  const airportText = airportNameContainer.textContent;
  if (!airportText) {
    throw new MissingFieldParserError("Unable to extract airport name");
  }

  const matchInfo = airportText.match(AIRPORT_REGEX);
  if (!matchInfo) {
    throw new Error(`${airportText} does not match regex`);
  }

  const airportInfo = matchInfo.groups;
  if (!airportInfo) {
    throw new Error(`Unknown groups: ${airportInfo}`);
  }
  if (!airportInfo.airportName) {
    throw new MissingFieldParserError("Unable to extract airport name");
  }
  if (!airportInfo.airportCode) {
    throw new MissingFieldParserError("Unable to extract airport code");
  }

  return { name: airportInfo.airportName, code: airportInfo.airportCode };
};

const getFormattedArrivalTime = (departureDateTime: Date, arrivalDateTime: Date): string => {
  let arrivalTime = format(arrivalDateTime, "h:mmaaa");
  const excessDays = getExcessDays(departureDateTime, arrivalDateTime);
  if (excessDays) {
    arrivalTime += `+${excessDays}`;
  }
  return arrivalTime;
};

const getFormattedDepartureTime = (
  departureDateTime: Date,
  previousFlightSegmentDetails: KiwiDetailedFlightSegment,
): string => {
  let departureTime = format(departureDateTime, "h:mmaaa");
  // if (
  //   departureTime.toLowerCase().startsWith("6:22a") &&
  //   !!previousFlightSegmentDetails &&
  //   format(previousFlightSegmentDetails.departureTime, "h:mmaaa").toLowerCase().startsWith("10:25p")
  // ) {
  //   debugger;
  // }
  const layoverDays = getLayoverDays(previousFlightSegmentDetails, departureDateTime);

  if (layoverDays > 0) {
    departureTime += `+${layoverDays}`;
  }

  return departureTime;
};

const getLayoverDays = (previousFlightSegmentDetails: KiwiDetailedFlightSegment, departureDateTime: Date): number => {
  if (!previousFlightSegmentDetails) {
    return 0;
  }

  return getExcessDays(previousFlightSegmentDetails.arrivalTime, departureDateTime);
};
