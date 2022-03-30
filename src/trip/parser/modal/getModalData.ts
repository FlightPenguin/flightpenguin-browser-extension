import { getParsedDate } from "../../../components/utilities/forms";
import { getFlightDateFromTimeString } from "../../../shared/parser/getFlightDateFromTimeString";
import { getParsedModalHtml } from "../../../shared/parser/modal/getParsedModalHtml";
import { FlightInput } from "../../../shared/types/newtypes/Flight";
import { getTimezoneOffset } from "../../../shared/types/newtypes/utilities/getTimezoneOffset";
import { getDurationInMinutes } from "../../../shared/utilities/getDurationInMinutes";
import { getAirlineNames } from "./getAirlineNames";
import { getAirportCodes } from "./getAirportCodes";
import { getFlightDuration } from "./getFlightDuration";
import { getFlightTimes } from "./getFlightTimes";
import { setModalHtml } from "./setModalHtml";

interface FlightsData {
  departure: FlightInput[];
  return?: FlightInput[];
}

const DETAILS_CONTAINER_SELECTOR = "div.f-flight-detail__content";
const FLIGHT_SELECTOR = "div.f-flight-detail__table";
const LAYOVER_SKIP_SELECTOR = "flight_transfer";

export const getModalData = async (
  flightCard: HTMLDivElement,
  roundtrip: boolean,
  departureDate: string,
  returnDate: string,
  flightId: string,
): Promise<FlightsData> => {
  // minimize time modal is open
  await setModalHtml(flightCard, flightId);
  const modal = getParsedModalHtml(flightId, "BOTH");

  const [departureContainer, returnContainer] = modal.querySelectorAll(DETAILS_CONTAINER_SELECTOR);

  if (!!returnContainer && !roundtrip) {
    throw new Error("WTF, have full details return container but one way flight");
  }

  if (!returnContainer && roundtrip) {
    throw new Error("WTF, have no full details return container but roundtrip flight");
  }

  return roundtrip
    ? {
        departure: getFlights(departureContainer as HTMLDivElement, departureDate),
        return: getFlights(returnContainer as HTMLDivElement, returnDate),
      }
    : { departure: getFlights(departureContainer as HTMLDivElement, departureDate) };
};

const getFlights = (container: HTMLDivElement, rawDepartureDate: string): FlightInput[] => {
  const flightContainers = Array.from(container.querySelectorAll(FLIGHT_SELECTOR) as NodeListOf<HTMLDivElement>);
  const flights: FlightInput[] = [];
  const departureDate = getParsedDate(rawDepartureDate);

  let elapsedTimezoneOffset = 0;
  flightContainers
    .filter((flightContainer) => {
      const testId = flightContainer.dataset.testid;
      return !!testId && !testId.toLowerCase().startsWith(LAYOVER_SKIP_SELECTOR);
    })
    .forEach((flightContainer) => {
      const { arrivalTime, departureTime } = getFlightTimes(flightContainer, departureDate);
      const { arrivalAirportCode, departureAirportCode } = getAirportCodes(flightContainer);
      const { duration } = getFlightDuration(flightContainer);
      const { marketingAirlineName } = getAirlineNames(flightContainer);

      const departureLocalDateTime = getFlightDateFromTimeString(departureTime, departureDate);
      const arrivalLocalDateTime = getFlightDateFromTimeString(arrivalTime, departureLocalDateTime);

      const flight = {
        arrivalLocalDateTime,
        arrivalLocation: { code: arrivalAirportCode },
        departureLocalDateTime,
        departureLocation: { code: departureAirportCode },
        durationMinutes: getDurationInMinutes(duration),
        marketingAirline: { name: marketingAirlineName },
        elapsedTimezoneOffset,
      } as FlightInput;

      elapsedTimezoneOffset += getTimezoneOffset(
        flight.arrivalLocalDateTime as Date,
        flight.departureLocalDateTime as Date,
        flight.durationMinutes as number,
      );

      flights.push(flight);
    });
  return flights;
};
