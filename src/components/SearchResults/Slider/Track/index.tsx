import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React, { HTMLProps } from "react";

import { getTrackPosition } from "./getTrackPosition";

interface TrackProps {
  state: { index: number; value: number[] };
  props: HTMLProps<HTMLDivElement>;
  heightValue: number;
  intervals: number[];
  touched: boolean;
  minimumValue: number;
  maximumValue: number;
  flightTimeContainerWidth: number;
}

const Track = ({
  state,
  props,
  heightValue,
  intervals,
  touched,
  minimumValue,
  maximumValue,
  flightTimeContainerWidth,
}: TrackProps): React.ReactElement => {
  const value = touched ? state.value : [minimumValue, maximumValue];

  const { left, right } = getTrackPosition({ value: value, index: state.index, flightTimeContainerWidth, intervals });

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

const getValuesForMemoCheck = ({
  state,
  props,
  intervals,
  minimumValue,
  maximumValue,
  flightTimeContainerWidth,
}: TrackProps) => {
  return {
    index: state.index,
    left: props.style?.left,
    right: props.style?.right,
    intervals,
    minimumValue,
    maximumValue,
    flightTimeContainerWidth,
  };
};
