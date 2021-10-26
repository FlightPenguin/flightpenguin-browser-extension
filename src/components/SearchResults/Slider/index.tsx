import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useState } from "react";
import ReactSlider from "react-slider";

import { getDateValueInRange } from "../../../shared/utilities/getDateValueInRange";
import { flightTimeContainerWidth } from "../../constants";
import Thumb from "./Thumb";
import Track from "./Track";
import { getAcceptableDateRange } from "./utilities/getAcceptableDateRange";
import { getDatetimeByTick } from "./utilities/getDatetimeByTick";
import { getSliderTicks } from "./utilities/getSliderTicks";

interface TimelineSliderProps {
  intervals: number[];
  startDate: Date;
  intervalWidth: number;
  onRangeChange: (minDate: Date, maxDate: Date) => void;
  disabled: boolean;
}

const heightValue = 8;

const TimelineSlider = ({
  intervals,
  startDate,
  intervalWidth,
  onRangeChange,
  disabled,
}: TimelineSliderProps): React.ReactElement => {
  const [touched, setTouched] = useState(false);

  const { minimumDate, maximumDate } = getAcceptableDateRange({ intervals, startDate });
  const ticks = getSliderTicks({ intervals });

  return (
    <Box
      width={`${flightTimeContainerWidth}px`}
      alignItems="center"
      marginLeft={`${intervalWidth / 2}px`}
      height={`${heightValue}px`}
      marginTop="major-2"
      marginBottom="major-6"
      display={disabled ? "none" : "block"}
    >
      <ReactSlider
        ariaLabel={["Depart after", "Arrive before"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        defaultValue={[0, ticks]}
        disabled={disabled}
        max={ticks}
        min={0}
        minDistance={8}
        pearling
        renderThumb={(props, state) => {
          return (
            <Thumb
              state={state}
              props={props}
              minimumValue={0}
              maximumValue={ticks}
              startDate={startDate}
              intervals={intervals}
              heightValue={heightValue}
              touched={touched}
            />
          );
        }}
        renderTrack={(props, state) => {
          return (
            <Track
              state={state}
              props={props}
              heightValue={heightValue}
              intervals={intervals}
              minimumValue={0}
              maximumValue={ticks}
              touched={touched}
            />
          );
        }}
        onChange={(value) => {
          const { datetime: lowerBoundary } = getDatetimeByTick({ startDate, value: value[0] });
          const { datetime: upperBoundary } = getDatetimeByTick({ startDate, value: value[1] });
          onRangeChange(
            getDateValueInRange({ value: lowerBoundary, minimumValue: minimumDate, maximumValue: maximumDate }),
            getDateValueInRange({ value: upperBoundary, minimumValue: minimumDate, maximumValue: maximumDate }),
          );
          setTouched(true);
        }}
        step={1}
      />
    </Box>
  );
};

export default React.memo(TimelineSlider, (previous, next) => {
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({ intervals, startDate, intervalWidth, disabled }: TimelineSliderProps) => {
  return {
    intervalsCount: intervals.length,
    startDate: startDate,
    intervalWidth: intervalWidth,
    disabled: disabled,
  };
};
