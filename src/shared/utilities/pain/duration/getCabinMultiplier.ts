import { CabinType } from "../../../../background/constants";

export const getCabinMultiplier = (cabin: CabinType): number => {
  if (["econ", "prem_econ"].includes(cabin)) {
    return 1;
  } else if (cabin === "business") {
    return 2;
  } else {
    return 5;
  }
};
