interface GetFlightRowComponentsWidthInput {
  resultsContainerWidth: number;
}

interface GetFlightRowComponentsWidthOutput {
  legendContainerWidth: number;
  flightSegmentsContainerWidth: number;
}

export const getFlightRowComponentsWidth = ({
  resultsContainerWidth,
}: GetFlightRowComponentsWidthInput): GetFlightRowComponentsWidthOutput => {
  const legendContainerWidth = getLegendWidth(resultsContainerWidth);
  const flightSegmentsContainerWidth = resultsContainerWidth - legendContainerWidth - 1;
  return { legendContainerWidth, flightSegmentsContainerWidth };
};

export const getLegendWidth = (resultsContainerWidth: number): number => {
  return Math.max(Math.min(Math.floor(resultsContainerWidth * 0.2), 300), 72);
};
