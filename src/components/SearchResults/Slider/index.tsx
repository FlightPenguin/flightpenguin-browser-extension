import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";

import { getDateValueInRange } from "../../../shared/utilities/getDateValueInRange";
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
  flightCount: number;
  timezoneOffset: number;
  flightTimeContainerWidth: number;
}

const heightValue = 8;

const TimelineSlider = ({
  intervals,
  startDate,
  intervalWidth,
  onRangeChange,
  disabled,
  flightCount,
  timezoneOffset,
  flightTimeContainerWidth,
}: TimelineSliderProps): React.ReactElement => {
  const [touched, setTouched] = useState(false);
  /*
    react-slider uses defaultValues only on the initial load.  If the defaultValues change, it is not applied.
    Our UI shenanigans mask this, but do not solve the problem.  So, we have to directly control state.
    Note that 112 = 28 * 4, which is a hardcode from our skeleton intervals...
   */
  const [ticks, setTicks] = useState(112);
  const [values, setValues] = useState([0, 112]);

  useEffect(() => {
    const tickCount = getSliderTicks({ intervals });
    setTicks(tickCount);
    if (!touched) {
      setValues([0, tickCount]);
    }
  }, [intervals, touched]);

  const { minimumDate, maximumDate } = getAcceptableDateRange({ intervals, startDate, timezoneOffset });

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
        value={values}
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
              flightCount={flightCount}
              timezoneOffset={timezoneOffset}
              flightTimeContainerWidth={flightTimeContainerWidth}
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
              flightTimeContainerWidth={flightTimeContainerWidth}
            />
          );
        }}
        onChange={(value) => {
          setValues(value);
          const { datetime: lowerBoundary } = getDatetimeByTick({ startDate, value: value[0] });
          const { datetime: upperBoundary } = getDatetimeByTick({ startDate, value: value[1], timezoneOffset });
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

const getValuesForMemoCheck = ({
  intervals,
  startDate,
  intervalWidth,
  disabled,
  flightCount,
  flightTimeContainerWidth,
}: TimelineSliderProps) => {
  return {
    intervalsCount: intervals.length,
    startDate: startDate,
    intervalWidth: intervalWidth,
    disabled: disabled,
    flightCount: flightCount,
    flightTimeContainerWidth: flightTimeContainerWidth,
  };
};
