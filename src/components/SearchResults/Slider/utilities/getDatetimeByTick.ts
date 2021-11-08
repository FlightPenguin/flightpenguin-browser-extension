import { addMinutes, format } from "date-fns";

interface GetDatetimeByTickProps {
  startDate: Date;
  value: number;
  timezoneOffset?: number;
}

interface GetDatetimeByTickOutput {
  formattedDate: string;
  formattedDatetime: string;
  formattedTime: string;
  datetime: Date;
}

export const getDatetimeByTick = ({
  startDate,
  value,
  timezoneOffset,
}: GetDatetimeByTickProps): GetDatetimeByTickOutput => {
  let datetime = addMinutes(startDate, value * 15);
  if (timezoneOffset) {
    datetime = addMinutes(datetime, timezoneOffset * -1);
  }

  let formattableDatetime = datetime;

  // for now, we will 'fix' DST differences by ignoring DST.
  if (startDate.getTimezoneOffset() !== datetime.getTimezoneOffset()) {
    const tzDiffMins = datetime.getTimezoneOffset() - startDate.getTimezoneOffset();
    formattableDatetime = addMinutes(datetime, tzDiffMins);
  }

  const formattedDatetime = format(formattableDatetime, "MM/dd/yyyy h:mmaaa");
  const [formattedDate, formattedTime] = formattedDatetime.split(/\s+/);

  return { datetime, formattedDate, formattedTime, formattedDatetime };
};
