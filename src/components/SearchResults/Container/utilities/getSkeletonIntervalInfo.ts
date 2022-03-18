import { addDays, startOfDay } from "date-fns";

import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { getParsedDate } from "../../../utilities/forms";

interface GetSkeletonIntervalInfoInput {
  formData: FlightSearchFormData;
  tripContainerWidth: number;
  containerIndex: number;
}

interface GetSkeletonIntervalInfoOutput {
  earliestTime: Date;
  latestTime: Date;
  intervals: number[];
  intervalWidth: number;
  timezoneOffset: number;
}

export const getSkeletonIntervalInfo = ({
  containerIndex,
  formData,
  tripContainerWidth,
}: GetSkeletonIntervalInfoInput): GetSkeletonIntervalInfoOutput => {
  const baseDate = getParsedDate(formData.roundtrip && containerIndex === 2 ? formData.toDate : formData.fromDate);
  const earliestTime = startOfDay(baseDate);
  const latestTime = addDays(earliestTime, 1);
  const intervals = [0, 4, 8, 12, 16, 20, 24];
  const intervalWidth = tripContainerWidth / (intervals.length - 1);
  return { earliestTime, latestTime, intervals, intervalWidth, timezoneOffset: 0 };
};
