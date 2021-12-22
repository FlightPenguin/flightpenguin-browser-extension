import { isVisible } from "../utilities/isVisible";

export const getNextVisibleSibling = (element: HTMLElement): HTMLElement | null => {
  let nextElement = element.nextElementSibling as HTMLElement | null;
  while (!!nextElement && !isVisible(nextElement)) {
    nextElement = nextElement.nextElementSibling as HTMLElement | null;
  }
  return nextElement;
};
