import { differenceInMinutes } from "date-fns";
import Decimal from "decimal.js-light";

import { TimebarPosition } from "../fragments/TimebarPosition";

interface GetPercentPerMinuteInput {
  startTime: Date;
  endTime: Date;
  elapsedTime?: number;
}

interface GetTimebarPositionsInput {
  containerStartTime: Date;
  containerEndTime: Date;
  containerElapsedTime?: number;
  timebarStartTime: Date;
  timebarEndTime: Date;
}

export const getTimebarPositions = ({
  containerStartTime,
  containerEndTime,
  containerElapsedTime,
  timebarStartTime,
  timebarEndTime,
}: GetTimebarPositionsInput): TimebarPosition => {
  // we have a container that is actually a bit larger.  we need to get the 'right' calculations...
  // are our intervalWidth calculations right?
  // should we just 'add' the increment to the end time?

  const pctPerMinute = getPercentagePerMinute({
    startTime: containerStartTime,
    endTime: containerEndTime,
    elapsedTime: containerElapsedTime,
  });
  const startX = new Decimal(differenceInMinutes(timebarStartTime, containerStartTime))
    .times(pctPerMinute)
    .toDecimalPlaces(2)
    .toNumber();
  const width = new Decimal(differenceInMinutes(timebarEndTime, timebarStartTime))
    .times(pctPerMinute)
    .toDecimalPlaces(2)
    .toNumber();
  return { startX, width };
};

export const getPercentagePerMinute = ({ startTime, endTime, elapsedTime }: GetPercentPerMinuteInput): Decimal => {
  if (!elapsedTime) {
    elapsedTime = differenceInMinutes(endTime, startTime);
  }
  return new Decimal(100).dividedBy(new Decimal(elapsedTime));
};
