interface GetTimelineRowComponentsWidthInput {
  resultsContainerWidth: number;
}

interface GetTimelineRowComponentsWidthOutput {
  legendContainerWidth: number;
  tripContainerWidth: number;
}

export const getTimelineRowComponentsWidth = ({
  resultsContainerWidth,
}: GetTimelineRowComponentsWidthInput): GetTimelineRowComponentsWidthOutput => {
  const legendContainerWidth = getLegendWidth(resultsContainerWidth);
  const tripContainerWidth = resultsContainerWidth - legendContainerWidth - 1;
  return { legendContainerWidth, tripContainerWidth };
};

export const getLegendWidth = (resultsContainerWidth: number): number => {
  return Math.max(Math.min(Math.floor(resultsContainerWidth * 0.2), 300), 72);
};
