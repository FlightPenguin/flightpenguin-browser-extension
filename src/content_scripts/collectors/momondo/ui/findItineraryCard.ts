import { waitForAppearance } from "../../../../shared/utilities/waitFor";

export const findItineraryCard = async (id: string): Promise<HTMLDivElement> => {
  const desiredFlightCardSelector = `div[data-resultid*='${id}']`;
  return (await waitForAppearance(3000, desiredFlightCardSelector)) as HTMLDivElement;
};
