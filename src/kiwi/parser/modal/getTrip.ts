import { MissingElementLookupError } from "../../../shared/errors";
import { FlightInput } from "../../../shared/types/Flight";
import { TripComponentInput } from "../../../shared/types/TripComponent";
import { getTimezoneOffset } from "../../../shared/types/utilities/getTimezoneOffset";
import { getAirlineName } from "./getAirlineName";
import { getAirports } from "./getAirports";
import { getDuration } from "./getDuration";
import { getFlightTimes } from "./getFlightTimes";

const FLIGHT_CONTAINER_SELECTOR = "div[class*='SectorGridWrapper']";

export const getTrip = (tripSection: HTMLDivElement): TripComponentInput[] => {
  const flightInputs = getFlights(tripSection);
  return flightInputs.map((flightInput) => {
    return { object: flightInput, type: "FLIGHT" };
  });
};

const getFlights = (tripSection: HTMLDivElement): FlightInput[] => {
  const flightContainers = tripSection.querySelectorAll(FLIGHT_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (!flightContainers.length) {
    throw new MissingElementLookupError("Unable to locate flight containers");
  }

  let elapsedTimezoneOffset = 0;
  const trip = Array.from(flightContainers)
    .filter((flightContainer, index) => {
      if (index % 2 === 0) {
        return flightContainer;
      }
    })
    .map((flightContainer) => {
      const input = getFlightInput(flightContainer, elapsedTimezoneOffset);
      const flightTimezoneOffset = getTimezoneOffset(
        input.arrivalLocalDateTime as Date,
        input.departureLocalDateTime as Date,
        input.durationMinutes as number,
      );
      elapsedTimezoneOffset += flightTimezoneOffset;
      return input;
    });
  return trip;
};

const getFlightInput = (flightContainer: HTMLDivElement, elapsedTimezoneOffset: number): FlightInput => {
  const { departureTime, arrivalTime } = getFlightTimes(flightContainer);
  const marketingAirline = getAirlineName(flightContainer);
  const { durationInMinutes } = getDuration(flightContainer);
  const { departureAirport, arrivalAirport } = getAirports(flightContainer);
  return {
    arrivalLocation: { name: arrivalAirport.name, code: arrivalAirport.code, type: "AIRPORT" },
    arrivalLocalDateTime: arrivalTime,
    departureLocation: { name: departureAirport.name, code: departureAirport.code, type: "AIRPORT" },
    departureLocalDateTime: departureTime,
    durationMinutes: durationInMinutes,
    marketingAirline: { name: marketingAirline },
    elapsedTimezoneOffset,
  };
};
