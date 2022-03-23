import { CabinType } from "../../../../../../background/constants";

export const getCabinMultiplier = (cabin: CabinType): number => {
  switch (cabin) {
    case "econ":
      return 1;
    case "prem_econ":
      return 1.25;
    case "business":
      return 2;
    case "first":
      return 5;
    default:
      throw new Error("Unknown cabin class");
  }
};
