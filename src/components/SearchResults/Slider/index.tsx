import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useState } from "react";
import ReactSlider from "react-slider";

import { flightTimeContainerWidth } from "../../constants";
import Thumb from "./Thumb";
import Track from "./Track";
import { getAcceptableDateRange } from "./utilities/getAcceptableDateRange";
import { getSliderTicks } from "./utilities/getSliderTicks";

interface TimelineSliderProps {
  intervals: number[];
  startDate: Date;
  intervalWidth: number;
  onRangeChange: (minDate: Date, maxDate: Date) => void;
}

const heightValue = 8;

const TimelineSlider = ({
  intervals,
  startDate,
  intervalWidth,
  onRangeChange,
}: TimelineSliderProps): React.ReactElement => {
  const { minimumDate, maximumDate } = getAcceptableDateRange({ intervals, startDate });
  const [earliestDatetime, setEarliestDatetime] = useState<Date>(minimumDate);
  const [latestDatetime, setLatestDatetime] = useState<Date>(maximumDate);

  const ticks = getSliderTicks({ intervals });

  return (
    <Box
      width={`${flightTimeContainerWidth}px`}
      alignItems="center"
      marginLeft={`${intervalWidth / 2}px`}
      height={`${heightValue}px`}
      marginTop="major-2"
      marginBottom="major-6"
    >
      <ReactSlider
        ariaLabel={["Depart after", "Arrive before"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        defaultValue={[0, ticks]}
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
              // onChange={(index: number, value: Date) => {
              //   switch (index) {
              //     case 0:
              //       setEarliestDatetime(value);
              //       onRangeChange(value, latestDatetime);
              //       break;
              //     case 1:
              //       setLatestDatetime(value);
              //       onRangeChange(earliestDatetime, value);
              //       break;
              //     default:
              //       throw new Error(`Unknown index value (${index}`);
              //   }
              // }}
            />
          );
        }}
        renderTrack={(props, state) => {
          return <Track state={state} props={props} heightValue={heightValue} intervals={intervals} />;
        }}
        step={1}
      />
    </Box>
  );
};

export default React.memo(TimelineSlider, (previous, next) => {
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({ intervals, startDate, intervalWidth }: TimelineSliderProps) => {
  return {
    intervalsCount: intervals.length,
    startDate: startDate,
    intervalWidth: intervalWidth,
  };
};
