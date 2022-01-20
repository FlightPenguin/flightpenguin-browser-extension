import { defaultSearchFormWidth } from "../../../components/constants";

export const getFormContainerWidth = (parentContainerWidth: number): number => {
  return Math.min(parentContainerWidth, defaultSearchFormWidth);
};
