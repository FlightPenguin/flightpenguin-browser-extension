import { waitForAppearance } from "../../shared/utilities/waitFor";

export const findFlightCard = async (tripId: string): Promise<HTMLDivElement> => {
  const flightCardSelector = `div[data-fpid='${tripId}']`;
  // we may be in the middle of a reprocessing, give a little bit of time...
  return (await waitForAppearance(3000, flightCardSelector)) as HTMLDivElement;
};
