import { Box, Icon } from "bumbag";
import React, { HTMLProps } from "react";

import { flightTimeContainerWidth } from "../../../constants";
import { thumbWidthValue } from "../constants";
import { getDatetimeAtPosition } from "../getDatetimeAtPosition";
import { getThumbPosition } from "./getThumbPosition";

interface ThumbProps {
  state: { index: number; value: number[]; valueNow: number };
  props: HTMLProps<HTMLDivElement>;
  startDate: Date;
  intervals: number[];
  heightValue: number;
}

const widthValue = thumbWidthValue;

export const Thumb = ({ state, props, startDate, intervals, heightValue }: ThumbProps): React.ReactElement => {
  const { formattedDate, formattedTime } = getDatetimeAtPosition({
    startDate,
    position: state.valueNow,
    intervals: intervals,
    width: flightTimeContainerWidth,
  });

  const position = getThumbPosition({ props, index: state.index });
  const heightAdjust = (thumbWidthValue - heightValue) / 2;

  return (
    <Box
      aria-valuetext={`${formattedDate} ${formattedTime}`}
      aria-orientation="horizontal"
      aria-label={state.index === 0 ? "Depart after" : "Arrive before"}
      cursor="grab"
      key={`thumb-${state.index}`}
      left={`${position}px`}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onTouchStart={props.onTouchStart}
      position="absolute"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={props.ref}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      top={`-${heightAdjust}px`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      zIndex={`${props.style?.zIndex || 0}`}
    >
      <Box
        display="flex"
        borderRadius="50%"
        height={`${widthValue}px`}
        width={`${widthValue}px`}
        backgroundColor="black"
        altitude="400"
        justifyContent="center"
        alignItems="center"
      >
        <Icon icon={state.index === 0 ? "solid-plane-departure" : "solid-plane-arrival"} color="white" fontSize="300" />
      </Box>
    </Box>
  );
};
