import Decimal from "decimal.js-light";

import { InvalidArgument, InvalidArgumentsError } from "../../../../shared/errors";
import { thumbWidthWrapperValue } from "../constants";
import { getSliderTicks } from "./getSliderTicks";

interface GetPositionByTickProps {
  value: number;
  intervals: number[];
  applyAdjustment?: boolean;
  flightTimeContainerWidth: number;
}

export const getPositionByTick = ({
  value,
  intervals,
  flightTimeContainerWidth,
  applyAdjustment = true,
}: GetPositionByTickProps): number => {
  validateInput({ value, intervals, flightTimeContainerWidth });

  const ticks = getSliderTicks({ intervals });
  const adjustmentValue = applyAdjustment ? thumbWidthWrapperValue / 2 : 0;

  return new Decimal(flightTimeContainerWidth)
    .dividedBy(ticks)
    .times(value)
    .minus(adjustmentValue)
    .toDecimalPlaces(2)
    .toNumber();
};

const validateInput = ({ value, intervals, flightTimeContainerWidth }: GetPositionByTickProps): void => {
  const invalidArgs = [] as InvalidArgument[];

  if (Number.isNaN(value)) {
    invalidArgs.push({ argumentName: "value", value: value });
  }

  if (Number.isNaN(flightTimeContainerWidth)) {
    invalidArgs.push({ argumentName: "flightTimeContainerWidth", value: flightTimeContainerWidth });
  }

  if (
    intervals.some((value) => {
      return Number.isNaN(value);
    })
  ) {
    invalidArgs.push({ argumentName: "intervals", value: intervals });
  }

  if (invalidArgs.length) {
    throw new InvalidArgumentsError("getPositionByTick", invalidArgs);
  }
};
