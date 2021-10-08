import Decimal from "decimal.js-light";

import { thumbWidthWrapperValue } from "../constants";

interface GetMinSeparationProps {
  pixelsPerMinute: Decimal;
  minSeparationMinutes: number;
}

export const getMinSeparation = ({ pixelsPerMinute, minSeparationMinutes = 120 }: GetMinSeparationProps): number => {
  return Math.abs(
    pixelsPerMinute.times(minSeparationMinutes).minus(thumbWidthWrapperValue).toDecimalPlaces(2).toNumber(),
  );
};
