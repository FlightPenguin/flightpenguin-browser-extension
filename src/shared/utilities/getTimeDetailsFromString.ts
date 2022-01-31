import { InvalidArgument, InvalidArgumentsError } from "../errors";
import { FlightTimeDetails } from "../types/FlightTimeDetails";
import { getElapsedTime } from "./getElapsedTime";

export const getTimeDetailsFromString = (time: string): FlightTimeDetails => {
  validateInput(time);

  const { hours, minutes } = getElapsedTime(time, true);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const timeOfDay = time.toLowerCase().match(/(pm)|(am)/)[0];
  const rawExcessDays = time.match(/(\[+-]\d)/);
  const excessDays = rawExcessDays ? rawExcessDays[0] : "";
  const displayHours = Math.abs(Number(time.split(":")[0])); // want 12 hour clock

  return {
    hours: hours,
    displayHours,
    minutes,
    timeOfDay,
    excessDays,
    excessDayCount: excessDays ? Number(excessDays) : 0,
  };
};

const validateInput = (time: string): void => {
  const invalidArgs = [] as InvalidArgument[];

  if (!time.includes(":")) {
    invalidArgs.push({ argumentName: "time-colon", value: time });
  }

  if (!time.toLowerCase().match(/(pm)|(am)/)) {
    invalidArgs.push({ argumentName: "time-indicator", value: time });
  }

  if (invalidArgs.length) {
    throw new InvalidArgumentsError("getPixelsPerMinute", invalidArgs);
  }
};
