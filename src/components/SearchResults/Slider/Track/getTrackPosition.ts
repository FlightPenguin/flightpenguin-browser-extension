import { HTMLProps } from "react";

import { thumbWidthWrapperValue } from "../constants";

interface GetTrackPositionProps {
  props: HTMLProps<HTMLDivElement>;
  index: number;
}

export const getTrackPosition = ({ props, index }: GetTrackPositionProps): { left: number; right: number } => {
  /*
  We need to adjust the position to the track to deal with the thumb positional adjustment.
  Track 0: Left of the first slider thumb.
  Track 1: Between the thumbs
  Track 2: To the right of the thumbs
   */

  let leftPosition = (props.style?.left as number) || 0;
  const rightPosition = (props.style?.right as number) || 0;

  if (index === 2) {
    leftPosition += thumbWidthWrapperValue;
  }

  return { left: leftPosition, right: rightPosition };
};
