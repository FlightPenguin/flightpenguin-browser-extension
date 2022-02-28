import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { CheapoAirFlight } from "../typings/Flight";
import { getContractIds } from "./getContractIds";
import { getFlight } from "./getFlight";
import { waitForPageLoad } from "./waitForPageLoad";

const FLIGHT_CARD_SELECTOR = "article[class*='row contract']";

export const getFlightsOnPage = async (formData: FlightSearchFormData): Promise<CheapoAirFlight[]> => {
  await waitForPageLoad();

  const cheapoFlightIds = getContractIds();
  const flights = [] as CheapoAirFlight[];
  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  let idx = 0;
  for (const flightCard of flightCards) {
    const flight = await getFlight(flightCard, formData, cheapoFlightIds[idx]);
    if (flight) {
      flights.push(flight);
    }
    idx += 1;
  }

  return flights;
};
