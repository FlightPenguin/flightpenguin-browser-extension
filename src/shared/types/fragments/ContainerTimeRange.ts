export interface ContainerTimeRangeInput {
  differenceInMinutes?: number; // provided to minimize downstream calculations
  earliestTime: Date;
  latestTime: Date;
}
