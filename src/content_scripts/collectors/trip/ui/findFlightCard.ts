import { MissingElementLookupError } from "../../../../shared/errors";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { waitForAppearance } from "../../../../shared/utilities/waitFor";
import { setFlightIds } from "../parser/setFlightIds";

export const findFlightCard = async (itineraryId: string, formData: FlightSearchFormData): Promise<HTMLDivElement> => {
  const flightCardSelector = `div[data-fpid='${itineraryId}']`;
  let flightCard = document.querySelector(flightCardSelector) as HTMLDivElement;
  if (!flightCard) {
    await setFlightIds(formData);
    flightCard = (await waitForAppearance(2500, flightCardSelector)) as HTMLDivElement;
    if (!flightCard) {
      throw new MissingElementLookupError("Unable to locate flight card");
    }
  }

  return flightCard;
};
