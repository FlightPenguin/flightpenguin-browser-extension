import { defaultContainerWidth, sidePaddingWidth } from "../../../components/constants";

export const getResultsContainerWidth = (): number => {
  return Math.min(window.innerWidth - sidePaddingWidth * 2, defaultContainerWidth + sidePaddingWidth * 2);
};
