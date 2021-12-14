import { MissingElementLookupError } from "../../shared/errors";
import { getParsedModalHtml } from "../../shared/parser/getParsedModalHtml";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { setModalHtml } from "../ui/setModalHtml";
import { getFlightLayovers } from "./getFlightLayovers";

interface GetAllLayoversProps {
  flightCard: HTMLDivElement;
  roundtrip: boolean;
}

export const getAllLayovers = async ({
  flightCard,
  roundtrip,
}: GetAllLayoversProps): Promise<{ departureLayovers: FlightLeg[]; returnLayovers: FlightLeg[] }> => {
  await setModalHtml(flightCard);
  const modalDoc = getParsedModalHtml(flightCard);
  const modal = modalDoc.querySelector("div");
  if (!modal) {
    throw new MissingElementLookupError("Unable to extract modal div");
  }

  const departureLayovers = getFlightLayovers(modal, "DEPARTURE");
  const returnLayovers = roundtrip ? getFlightLayovers(modal, "RETURN") : [];
  return { departureLayovers, returnLayovers };
};
