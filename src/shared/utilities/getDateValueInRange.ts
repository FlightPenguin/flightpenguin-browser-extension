import { max, min } from "date-fns";

interface GetDateValueInRangeProps {
  value: Date;
  minimumValue: Date;
  maximumValue: Date;
}

export const getDateValueInRange = ({ value, minimumValue, maximumValue }: GetDateValueInRangeProps): Date => {
  return min([max([value, minimumValue]), maximumValue]);
};
