import { Box } from "bumbag";
import React from "react";
import ReactSlider from "react-slider";

import { flightTimeContainerWidth } from "../../constants";
import { getPixelsPerMinute } from "../../utilities/position/getPixelsPerMinute";
import { Thumb } from "./Thumb";
import { Track } from "./Track";
import { getIncrement } from "./utilities/getIncrement";
import { getStepSize } from "./utilities/getStepSize";

interface TimelineSliderProps {
  intervals: number[];
  startDate: Date;
  intervalWidth: number;
}

const heightValue = 8;

export const TimelineSlider = ({ intervals, startDate, intervalWidth }: TimelineSliderProps): React.ReactElement => {
  const pixelsPerMinute = getPixelsPerMinute({
    intervalCount: intervals.length,
    increment: getIncrement(intervals),
    width: flightTimeContainerWidth,
  });
  const stepSize = getStepSize({ pixelsPerMinute, stepMinutes: 15 });

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
        defaultValue={[0, flightTimeContainerWidth]}
        max={flightTimeContainerWidth}
        min={0}
        minDistance={10}
        pearling
        renderThumb={(props, state) => {
          return (
            <Thumb state={state} props={props} startDate={startDate} intervals={intervals} heightValue={heightValue} />
          );
        }}
        renderTrack={(props, state) => {
          return <Track state={state} props={props} heightValue={heightValue} />;
        }}
        step={stepSize}
      />
    </Box>
  );
};
