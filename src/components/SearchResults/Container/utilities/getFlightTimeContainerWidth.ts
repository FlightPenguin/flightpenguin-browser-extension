import { sidePaddingWidth } from "../../../constants";

interface GetFlightTimeContainerWidthInput {
  resultsContainerWidth: number;
  legendContainerWidth: number;
}

export const getFlightTimeContainerWidth = ({
  resultsContainerWidth,
  legendContainerWidth,
}: GetFlightTimeContainerWidthInput): number => {
  const paddingWidth = sidePaddingWidth * 2;
  return resultsContainerWidth - legendContainerWidth - paddingWidth - 1;
};
