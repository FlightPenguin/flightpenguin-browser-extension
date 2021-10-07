import { Box } from "bumbag";
import React, { HTMLProps } from "react";

import { getTrackPosition } from "./getTrackPosition";

interface TrackProps {
  state: { index: number; value: number[] };
  props: HTMLProps<HTMLDivElement>;
  heightValue: number;
}

export const Track = ({ state, props, heightValue }: TrackProps): React.ReactElement => {
  const { left, right } = getTrackPosition({ props, index: state.index });

  return (
    <Box
      backgroundColor={state.index % 2 === 1 ? "primary" : "gray"}
      bottom="0px"
      height={`${heightValue}px`}
      key={`track-${state.index}`}
      left={`${left}px`}
      position="absolute"
      right={`${right}px`}
      top="0px"
      willChange={props.style?.willChange}
    />
  );
};
