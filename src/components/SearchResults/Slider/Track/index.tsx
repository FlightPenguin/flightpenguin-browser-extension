import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React, { HTMLProps } from "react";

import { getTrackPosition } from "./getTrackPosition";

interface TrackProps {
  state: { index: number; value: number[] };
  props: HTMLProps<HTMLDivElement>;
  heightValue: number;
  intervals: number[];
}

const Track = ({ state, props, heightValue, intervals }: TrackProps): React.ReactElement => {
  const { left, right } = getTrackPosition({ value: state.value, index: state.index, intervals });

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

export default React.memo(Track, (previous, next) => {
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({ state, props, intervals }: TrackProps) => {
  return {
    index: state.index,
    left: props.style?.left,
    right: props.style?.right,
    intervalCount: intervals.length,
  };
};
