import { waitForAppearance } from "../../shared/utilities/waitFor";

export const findFlightCard = async (id: string): Promise<HTMLDivElement> => {
  const desiredFlightCardSelector = `div[data-fpid*='${id}']`;
  return (await waitForAppearance(3000, desiredFlightCardSelector)) as HTMLDivElement;
};
