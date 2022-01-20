import { pageSidePadding, sidePaddingWidth } from "../../../components/constants";

export const getResultsContainerWidth = (parentContainerWidth: number): number => {
  return parentContainerWidth - sidePaddingWidth * 2 - pageSidePadding * 2;
};
