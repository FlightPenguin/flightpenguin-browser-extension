import Decimal from "decimal.js-light";

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
  const ticks = getSliderTicks({ intervals });
  const adjustmentValue = applyAdjustment ? thumbWidthWrapperValue / 2 : 0;

  return new Decimal(flightTimeContainerWidth)
    .dividedBy(ticks)
    .times(value)
    .minus(adjustmentValue)
    .toDecimalPlaces(2)
    .toNumber();
};
