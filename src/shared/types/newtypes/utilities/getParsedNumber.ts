import isFinite from "lodash.isfinite";

export const getParsedNumber = (value: number | string): number => {
  return isFinite(value) ? (value as number) : Number(value as string);
};
