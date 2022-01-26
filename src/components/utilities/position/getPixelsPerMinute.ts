import Decimal from "decimal.js-light";

import { InvalidArgument, InvalidArgumentsError } from "../../../shared/errors";

interface GetPixelsPerMinuteProps {
  intervalCount: number;
  increment: number;
  width: number;
}

export const getPixelsPerMinute = ({ intervalCount, increment, width }: GetPixelsPerMinuteProps): Decimal => {
  validateInput({ intervalCount, increment, width });

  const totalHours = new Decimal((intervalCount - 1) * increment);
  const totalMinutes = totalHours.times(60);

  return new Decimal(width).dividedBy(totalMinutes).toDecimalPlaces(2);
};

const validateInput = ({ intervalCount, increment, width }: GetPixelsPerMinuteProps): void => {
  const invalidArgs = [] as InvalidArgument[];

  if (Number.isNaN(intervalCount)) {
    invalidArgs.push({ argumentName: "intervalCount", value: intervalCount });
  }

  if (Number.isNaN(increment)) {
    invalidArgs.push({ argumentName: "increment", value: increment });
  }

  if (Number.isNaN(width)) {
    invalidArgs.push({ argumentName: "width", value: width });
  }

  if (invalidArgs.length) {
    throw new InvalidArgumentsError("getPixelsPerMinute", invalidArgs);
  }
};
