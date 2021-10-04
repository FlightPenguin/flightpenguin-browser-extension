import { HTMLProps } from "react";

import { thumbWidthValue } from "../constants";

interface GetTrackPositionProps {
  props: HTMLProps<HTMLDivElement>;
  index: number;
}

export const getTrackPosition = ({ props, index }: GetTrackPositionProps): number => {
  /*
  We need to adjust the position to the track to deal with the thumb positional adjustment.
  Track 0: Left of the first slider thumb.
  Track 1: Between the thumbs
  Track 2: To the right of the thumbs
   */

  const adjustmentValue = thumbWidthValue / 2;

  let position = Number((props.style?.left?.toString() || "0px").split("px")[0]);
  if (index === 0) {
    position -= adjustmentValue;
  } else if (index === 2) {
    position += adjustmentValue;
  }

  return position;
};
