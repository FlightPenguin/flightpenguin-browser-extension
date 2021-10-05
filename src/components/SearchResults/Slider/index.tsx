import { Box } from "bumbag";
import React from "react";
import ReactSlider from "react-slider";

import { flightTimeContainerWidth } from "../../constants";
import { Thumb } from "./Thumb";
import { Track } from "./Track";

interface TimelineSliderProps {
  intervals: number[];
  startDate: Date;
  intervalWidth: number;
}

const heightValue = 8;

export const TimelineSlider = ({ intervals, startDate, intervalWidth }: TimelineSliderProps): React.ReactElement => {
  return (
    <Box
      width={`${flightTimeContainerWidth}px`}
      alignItems="center"
      marginLeft={`${intervalWidth / 2}px`}
      height={`${heightValue}px`}
      marginTop="major-2"
      marginBottom="major-4"
    >
      <ReactSlider
        defaultValue={[0, flightTimeContainerWidth]}
        min={0}
        max={flightTimeContainerWidth}
        ariaLabel={["Depart after", "Arrive before"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => {
          return (
            <Thumb state={state} props={props} startDate={startDate} intervals={intervals} heightValue={heightValue} />
          );
        }}
        renderTrack={(props, state) => {
          return <Track state={state} props={props} heightValue={heightValue} />;
        }}
        pearling
        minDistance={10}
      />
    </Box>
  );
};
