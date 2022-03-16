import { differenceInMinutes } from "date-fns";
import Decimal from "decimal.js-light";

interface GetPixelsPerMinuteInput {
  startTime: Date;
  endTime: Date;
  width: number;
}

interface GetTimebarPositionsInput {
  containerStartTime: Date;
  containerEndTime: Date;
  containerWidth: number;
  timebarStartTime: Date;
  timebarEndTime: Date;
}

interface GetTimebarPositionsOutput {
  startX: number;
  width: number;
}

export const getTimebarPositions = ({
  containerStartTime,
  containerEndTime,
  containerWidth,
  timebarStartTime,
  timebarEndTime,
}: GetTimebarPositionsInput): GetTimebarPositionsOutput => {
  const pxPerMinute = getPixelsPerMinute({
    startTime: containerStartTime,
    endTime: containerEndTime,
    width: containerWidth,
  });
  const startX = new Decimal(differenceInMinutes(timebarStartTime, containerStartTime))
    .times(pxPerMinute)
    .toDecimalPlaces(2)
    .toNumber();
  const width = new Decimal(differenceInMinutes(timebarEndTime, timebarStartTime))
    .times(pxPerMinute)
    .toDecimalPlaces(2)
    .toNumber();
  return { startX, width };
};

export const getPixelsPerMinute = ({ startTime, endTime, width }: GetPixelsPerMinuteInput): Decimal => {
  const diff = differenceInMinutes(endTime, startTime);
  return new Decimal(width).dividedBy(new Decimal(diff)).toDecimalPlaces(2);
};
