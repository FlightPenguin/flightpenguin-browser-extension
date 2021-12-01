import { defaultSearchFormWidth } from "../../../components/constants";

export const getFormContainerWidth = (): number => {
  return Math.min(window.innerWidth, defaultSearchFormWidth);
};
