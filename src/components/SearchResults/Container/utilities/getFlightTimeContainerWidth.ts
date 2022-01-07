interface GetFlightTimeContainerWidthInput {
  resultsContainerWidth: number;
  legendContainerWidth: number;
}

export const getFlightTimeContainerWidth = ({
  resultsContainerWidth,
  legendContainerWidth,
}: GetFlightTimeContainerWidthInput): number => {
  return resultsContainerWidth - legendContainerWidth - 1;
};
