import { addMinutes, format } from "date-fns";

interface GetDatetimeByTickProps {
  startDate: Date;
  value: number;
}

interface GetDatetimeByTickOutput {
  formattedDate: string;
  formattedDatetime: string;
  formattedTime: string;
  datetime: Date;
}

export const getDatetimeByTick = ({ startDate, value }: GetDatetimeByTickProps): GetDatetimeByTickOutput => {
  const datetime = addMinutes(startDate, value * 15);
  const formattedDatetime = format(datetime, "MM/dd/yyyy h:mmaaa");
  const [formattedDate, formattedTime] = formattedDatetime.split(/\s+/);

  return { datetime, formattedDate, formattedTime, formattedDatetime };
};
