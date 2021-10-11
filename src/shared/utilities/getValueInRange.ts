interface GetValueInRangeProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
}

export const getValueInRange = ({ value, minimumValue, maximumValue }: GetValueInRangeProps): number => {
  return Math.min(Math.max(value, minimumValue), maximumValue);
};
