import Decimal from "decimal.js-light";

import { flightTimeContainerWidth } from "../../../constants";
import { thumbWidthWrapperValue } from "../constants";
import { getSliderTicks } from "./getSliderTicks";

interface GetPositionByTickProps {
  value: number;
  intervals: number[];
  applyAdjustment?: boolean;
}

export const getPositionByTick = ({ value, intervals, applyAdjustment = true }: GetPositionByTickProps): number => {
  const ticks = getSliderTicks({ intervals });
  const adjustmentValue = applyAdjustment ? thumbWidthWrapperValue / 2 : 0;

  return new Decimal(flightTimeContainerWidth)
    .dividedBy(ticks)
    .times(value)
    .minus(adjustmentValue)
    .toDecimalPlaces(2)
    .toNumber();
};
