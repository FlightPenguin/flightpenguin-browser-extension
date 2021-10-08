import Decimal from "decimal.js-light";

import { flightTimeContainerWidth } from "../../../constants";
import { thumbWidthWrapperValue } from "../constants";

export const getCorrectedValue = (sliderValue: number): number => {
  /*
  Zillow's slider attempts to compensate for the width of the slider.
  It does this in a way we'd prefer it not.
  Let's get the uncorrected value, then adjust to suit our preferences - the exact middle of the thumb div.
   */
  const unadjustedValue = new Decimal(sliderValue)
    .times(flightTimeContainerWidth - thumbWidthWrapperValue)
    .dividedBy(flightTimeContainerWidth + flightTimeContainerWidth - thumbWidthWrapperValue);
  return unadjustedValue.plus(new Decimal(thumbWidthWrapperValue).dividedBy(2)).toDecimalPlaces(2).toNumber();
};
