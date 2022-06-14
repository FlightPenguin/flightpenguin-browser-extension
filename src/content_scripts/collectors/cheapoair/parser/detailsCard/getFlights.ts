import { getParsedDate } from "../../../../../components/utilities/forms";
import { FlightInput } from "../../../../../shared/types/Flight";
import { FlightSearchFormData } from "../../../../../shared/types/FlightSearchFormData";
import { getTripContainers } from "./getTripContainers";
import { getTripFlights } from "./getTripFlights";

export const getFlights = (
  flightCard: HTMLElement,
  formData: FlightSearchFormData,
): { departureFlights: FlightInput[]; returnFlights: FlightInput[] | null } => {
  const tripContainers = getTripContainers(flightCard, formData.roundtrip);
  const departureFlights = getTripFlights(tripContainers.departureContainer, getParsedDate(formData.fromDate));
  const returnFlights = tripContainers.returnContainer
    ? getTripFlights(tripContainers.returnContainer, getParsedDate(formData.toDate))
    : null;

  return { departureFlights: departureFlights, returnFlights: returnFlights };
};
