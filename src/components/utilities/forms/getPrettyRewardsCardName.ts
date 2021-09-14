import capitalize from "lodash.capitalize";

export const getPrettyRewardsCardName = (uglyValue: string): string => {
  return uglyValue
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
};
