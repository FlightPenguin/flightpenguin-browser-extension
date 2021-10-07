import { Box } from "bumbag";
import React, { HTMLProps } from "react";

import { getTrackPosition } from "./getTrackPosition";

interface TrackProps {
  state: { index: number; value: number[] };
  props: HTMLProps<HTMLDivElement>;
  heightValue: number;
}

export const Track = ({ state, props, heightValue }: TrackProps): React.ReactElement => {
  // TODO: Cleanup left, right.  Track 0 needs right moved leftwards the width of the slider, track 1 the opposite.
  // const position = getTrackPosition({ props, index: state.index });

  return (
    <Box
      backgroundColor={state.index % 2 === 1 ? "primary" : "gray"}
      bottom="0px"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      height={`${heightValue}px`}
      key={`track-${state.index}`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      left={`${props.style?.left || 0}px`}
      position="absolute"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      right={`${props.style?.right || 0}px`}
      top="0px"
      willChange={props.style?.willChange}
    />
  );
};
