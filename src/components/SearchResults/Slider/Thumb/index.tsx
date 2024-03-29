import { Box, Icon, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React, { HTMLProps, useState } from "react";

import { getValueInRange } from "../../../../shared/utilities/getValueInRange";
import { thumbWidthValue, thumbWidthWrapperValue } from "../constants";
import { getDatetimeByTick } from "../utilities/getDatetimeByTick";
import { getPositionByTick } from "../utilities/getPositionByTick";
import { LeftFlag } from "./LeftFlag";
import { RightFlag } from "./RightFlag";

interface ThumbProps {
  minimumValue: number;
  maximumValue: number;
  state: { index: number; value: number[]; valueNow: number };
  props: HTMLProps<HTMLDivElement>;
  startDate: Date;
  intervals: number[];
  heightValue: number;
  touched: boolean;
  tripCount: number;
  timezoneOffset: number;
  tripContainerWidth: number;
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
  touched,
  tripCount,
  timezoneOffset,
  tripContainerWidth,
}: ThumbProps): React.ReactElement => {
  const [inUse, setInUse] = useState(false);

  const heightAdjust = (thumbWidthValue - heightValue) / 2;
  const value = touched
    ? getValueInRange({ value: state.valueNow, minimumValue, maximumValue })
    : state.index === 0
    ? minimumValue
    : maximumValue;

  const { formattedDate, formattedTime } = getDatetimeByTick({
    startDate,
    value,
    timezoneOffset: state.index === 1 ? timezoneOffset : 0,
  });
  const position = getPositionByTick({ intervals, value, tripContainerWidth });
  const shadowPosition = getPositionByTick({ intervals, value, tripContainerWidth, applyAdjustment: false });
  const color = timezoneOffset ? (state.index === 0 ? "info" : "warning") : "black";

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
      onFocus={(event) => {
        if (props.onFocus) {
          props.onFocus(event);
          setInUse(true);
        }
      }}
      onBlur={() => {
        setInUse(false);
      }}
      onTouchStart={props.onTouchStart}
      onMouseDown={(event) => {
        if (props.onMouseDown) {
          props.onMouseDown(event);
          setInUse(true);
        }
      }}
      onMouseUp={() => {
        setInUse(false);
      }}
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
      zIndex={20}
    >
      <Box
        display="flex"
        borderRadius="50%"
        height={`${widthValue}px`}
        width={`${widthValue}px`}
        backgroundColor={color}
        altitude="400"
        justifyContent="center"
        alignItems="center"
      >
        <Icon icon={state.index === 0 ? "solid-plane-departure" : "solid-plane-arrival"} color="white" fontSize="300" />
      </Box>
      <Box
        marginTop="minor-1"
        tabIndex={0}
        aria-label={state.index === 0 ? "Filter flights to departures after" : "Filter flights to arrivals before"}
      >
        <Text fontWeight="700" color={color}>
          {formattedTime}
        </Text>
      </Box>
      {state.index === 0 ? (
        <LeftFlag color={color} inUse={inUse} position={shadowPosition} tripCount={tripCount} />
      ) : (
        <RightFlag
          color={color}
          inUse={inUse}
          position={shadowPosition}
          tripContainerWidth={tripContainerWidth}
          tripCount={tripCount}
        />
      )}
    </Box>
  );
};

export default React.memo(Thumb, (previous, next) => {
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({
  state,
  props,
  startDate,
  intervals,
  minimumValue,
  maximumValue,
  tripCount,
  tripContainerWidth,
}: ThumbProps) => {
  return {
    index: state.index,
    value: state.valueNow,
    zIndex: props.style?.zIndex,
    startDate,
    intervals: intervals,
    minimumValue,
    maximumValue,
    tripCount,
    tripContainerWidth,
  };
};
