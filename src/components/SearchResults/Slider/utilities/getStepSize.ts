import Decimal from "decimal.js-light";

interface GetStepSizeProps {
  stepMinutes: number;
  pixelsPerMinute: Decimal;
}

export const getStepSize = ({ pixelsPerMinute, stepMinutes = 15 }: GetStepSizeProps): number => {
  return pixelsPerMinute.times(stepMinutes).toDecimalPlaces(2).toNumber();
};
