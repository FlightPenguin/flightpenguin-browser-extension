import Decimal from "decimal.js-light";

import { flightTimeContainerWidth } from "../../../constants";
import { thumbWidthWrapperValue } from "../constants";
import { getSliderTicks } from "../utilities/getSliderTicks";

interface GetThumbPositionProps {
  index: number;
  value: number;
  intervals: number[];
}

export const getThumbPosition = ({ value, intervals, index }: GetThumbPositionProps): number => {
  /*
  We need to adjust the position to the slider thumb to have it's center at the exact 'right' time.
  The first thumb (index 0) subtracts, the second thumb adds.
   */
  const ticks = getSliderTicks({ intervals });
  const adjustmentValue = thumbWidthWrapperValue / 2;

  return new Decimal(flightTimeContainerWidth)
    .dividedBy(ticks)
    .times(value)
    .minus(adjustmentValue)
    .toDecimalPlaces(2)
    .toNumber();
};
