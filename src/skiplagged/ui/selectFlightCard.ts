import { findFlightCard } from "./findFlightCard";

export const selectFlightCard = async (skiplaggedId: string): Promise<void> => {
  const flightCard = (await findFlightCard(skiplaggedId)) as HTMLElement;
  flightCard.click();
};
