import { Box, Icon, Text, Tooltip } from "bumbag";
import { addMinutes, format } from "date-fns";
import isEqual from "lodash.isequal";
import React, { HTMLProps } from "react";

import { getValueInRange } from "../../../../shared/utilities/getValueInRange";
import { thumbWidthValue, thumbWidthWrapperValue } from "../constants";
import { getPositionByTick } from "../utilities/getPositionByTick";

interface ThumbProps {
  minimumValue: number;
  maximumValue: number;
  state: { index: number; value: number[]; valueNow: number };
  props: HTMLProps<HTMLDivElement>;
  startDate: Date;
  intervals: number[];
  heightValue: number;
}

const widthValue = thumbWidthValue;
const wrapperWidthValue = thumbWidthWrapperValue;

const Thumb = ({
  state,
  props,
  minimumValue,
  maximumValue,
  startDate,
  intervals,
  heightValue,
}: ThumbProps): React.ReactElement => {
  const value = getValueInRange({ value: state.valueNow, minimumValue, maximumValue });
  const datetime = addMinutes(startDate, value * 15);
  const formattedDatetime = format(datetime, "MM/dd/yyyy h:mmaaa");
  const [formattedDate, formattedTime] = formattedDatetime.split(/\s+/);

  const position = getPositionByTick({ intervals, value });
  const heightAdjust = (thumbWidthValue - heightValue) / 2;

  return (
    <Box
      alignItems="center"
      aria-valuetext={`${formattedDate} ${formattedTime}`}
      aria-orientation="horizontal"
      aria-label={state.index === 0 ? "Filter flights to departures after" : "Filter flights to arrivals before"}
      value={`${formattedDate} ${formattedTime}`}
      cursor="grab"
      display="flex"
      flexDirection="column"
      key={`thumb-${state.index}`}
      left={`${position}px`}
      onFocus={props.onFocus}
      onTouchStart={props.onTouchStart}
      position="absolute"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={props.ref}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      top={`-${heightAdjust}px`}
      width={`${wrapperWidthValue}px`}
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
      <Tooltip content={`${formattedDate}`} hasArrow placement="right">
        <Box marginTop="minor-1">
          <Text fontWeight="700">{formattedTime}</Text>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default React.memo(Thumb, (previous, next) => {
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({ state, props, startDate, intervals }: ThumbProps) => {
  return {
    index: state.index,
    value: state.valueNow,
    zIndex: props.style?.zIndex,
    startDate,
    intervalCount: intervals.length,
  };
};
