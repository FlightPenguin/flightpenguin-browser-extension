import { HTMLProps } from "react";

import { thumbWidthValue } from "../constants";

interface GetThumbPositionProps {
  props: HTMLProps<HTMLDivElement>;
  index: number;
}

export const getThumbPosition = ({ props, index }: GetThumbPositionProps): number => {
  /*
  We need to adjust the position to the slider thumb to have it's center at the exact 'right' time.
  The first thumb (index 0) subtracts, the second thumb adds.
   */

  const adjustmentValue = thumbWidthValue / 2;

  const internalPosition = Number((props.style?.left?.toString() || "0px").split("px")[0]);
  return index === 1 ? internalPosition + adjustmentValue : internalPosition - adjustmentValue;
};
