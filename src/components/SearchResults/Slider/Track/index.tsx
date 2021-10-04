import React, { HTMLProps } from "react";

import { getTrackPosition } from "./getTrackPosition";

interface TrackProps {
  state: { index: number; value: number[] };
  props: HTMLProps<HTMLDivElement>;
  heightValue: number;
}

export const Track = ({ state, props, heightValue }: TrackProps): React.ReactElement => {
  console.log(state);
  console.log(props);

  const position = getTrackPosition({ props, index: state.index });

  const backgroundColor = state.index % 2 === 1 ? "blue" : "grey";
  return (
    <div
      {...props}
      style={{
        ...props.style,
        top: 0,
        bottom: 0,
        backgroundColor: backgroundColor,
        height: `${heightValue}px`,
        left: `${position}px`,
      }}
    />
  );
};
