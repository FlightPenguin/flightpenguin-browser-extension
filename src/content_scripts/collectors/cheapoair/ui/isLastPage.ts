import { getActivePage } from "./getActivePage";

export const isLastPage = (maxPage: number): boolean => {
  const currentPageNumber = getActivePage();
  return maxPage === currentPageNumber;
};
