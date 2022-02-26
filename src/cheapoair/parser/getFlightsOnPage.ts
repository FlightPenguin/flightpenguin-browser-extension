import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { CheapoAirFlight } from "../typings/Flight";
import { getFlight } from "./getFlight";
import { waitForPageLoad } from "./waitForPageLoad";

const FLIGHT_CARD_SELECTOR = "article[class*='row contract']";

export const getFlightsOnPage = async (formData: FlightSearchFormData): Promise<CheapoAirFlight[]> => {
  await waitForPageLoad();

  const flights = [] as CheapoAirFlight[];

  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  for (const flightCard of flightCards) {
    const flight = await getFlight(flightCard, formData);
    if (flight) {
      flights.push(flight);
    }
  }

  return flights;
};
