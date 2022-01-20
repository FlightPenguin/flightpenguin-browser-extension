import { getParsedModalHtml } from "../../shared/parser/modal/getParsedModalHtml";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getKiwiFlightId } from "../shared/getKiwiFlightId";
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
  const kiwiId = getKiwiFlightId(flightCard);

  await setModalHtml(flightCard, kiwiId);
  const modal = getParsedModalHtml(kiwiId, "BOTH");

  const departureLayovers = getFlightLayovers(modal, "DEPARTURE");
  const returnLayovers = roundtrip ? getFlightLayovers(modal, "RETURN") : [];
  return { departureLayovers, returnLayovers };
};
