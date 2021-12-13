import { getParsedDate } from "../../../components/utilities/forms";
import { FlightLeg } from "../../../shared/types/FlightLeg";
import { closeModal } from "../../ui/closeModal";
import { openModal } from "../../ui/openModal";
import { getAirlineNames } from "./getAirlineNames";
import { getAirportCodes } from "./getAirportCodes";
import { getFlightDuration } from "./getFlightDuration";
import { getFlightTimes } from "./getFlightTimes";

interface LayoversData {
  departure: FlightLeg[];
  return?: FlightLeg[];
}

const DETAILS_CONTAINER_SELECTOR = "div.f-flight-detail__content";
const LEG_SELECTOR = "div.f-flight-detail__table";
const LAYOVER_SKIP_SELECTOR = "flight_transfer";

export const getModalData = async (
  flightCard: HTMLDivElement,
  roundtrip: boolean,
  departureDate: string,
): Promise<LayoversData> => {
  const modal = await openModal(flightCard);

  const [departureContainer, returnContainer] = modal.querySelectorAll(DETAILS_CONTAINER_SELECTOR);

  if (!!returnContainer && !roundtrip) {
    throw new Error("WTF, have full details return container but one way flight");
  }

  if (!returnContainer && roundtrip) {
    throw new Error("WTF, have no full details return container but roundtrip flight");
  }

  const data = roundtrip
    ? {
        departure: getLayoverDetails(departureContainer as HTMLDivElement, departureDate),
        return: getLayoverDetails(returnContainer as HTMLDivElement, departureDate),
      }
    : { departure: getLayoverDetails(departureContainer as HTMLDivElement, departureDate) };

  await closeModal(modal);
  return data;
};

const getLayoverDetails = (container: HTMLDivElement, rawDepartureDate: string): FlightLeg[] => {
  const layoverContainers = Array.from(container.querySelectorAll(LEG_SELECTOR) as NodeListOf<HTMLDivElement>);
  const flightLegs: FlightLeg[] = [];
  const departureDate = getParsedDate(rawDepartureDate);

  let elapsedTimezoneOffset = 0;
  layoverContainers
    .filter((layoverContainer) => {
      const testId = layoverContainer.dataset.testid;
      return !!testId && !testId.toLowerCase().startsWith(LAYOVER_SKIP_SELECTOR);
    })
    .forEach((layoverContainer) => {
      const { arrivalTime, departureTime } = getFlightTimes(layoverContainer, departureDate);
      const { arrivalAirportCode, departureAirportCode } = getAirportCodes(layoverContainer);
      const { duration } = getFlightDuration(layoverContainer);
      const { marketingAirlineName } = getAirlineNames(layoverContainer);

      const flightLeg = new FlightLeg({
        duration,
        from: departureAirportCode,
        fromTime: departureTime,
        operatingAirline: marketingAirlineName,
        to: arrivalAirportCode,
        toTime: arrivalTime,
        elapsedTimezoneOffset,
      });
      elapsedTimezoneOffset += flightLeg.timezoneOffset;

      flightLegs.push(flightLeg);
    });
  return flightLegs;
};
