import { FlightSegment } from "../FlightSegment";

export const getSegmentContainerPositions = (layovers: FlightSegment[]): { left: number; right: number } => {
  const firstLeg = layovers[0];
  const lastLeg = layovers.slice(-1)[0];

  const left = firstLeg.layout.startPosition;
  const right = lastLeg.layout.startPosition + lastLeg.layout.width;
  return { left, right };
};
