import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { Airport } from "../../SearchForm/api/airports/Airport";
import TimelineSlider from "../Slider";
import { TimeCell } from "./TimeCell";
import { getFontSize } from "./utilities/getFontSize";

interface TimelineHeaderProps {
  arrivalLocation: Airport;
  departureLocation: Airport;
  intervals: number[];
  tzOffset: number;
  onSliderChange: (minDate: Date, maxDate: Date) => void;
  sliderDisabled: boolean;
  tripCount: number;
  tripContainerWidth: number;
  intervalWidth: number;
  startDate: Date;
}

const TimelineHeader = ({
  arrivalLocation,
  departureLocation,
  intervals,
  tzOffset,
  onSliderChange,
  sliderDisabled,
  tripCount,
  tripContainerWidth,
  startDate,
  intervalWidth,
}: TimelineHeaderProps): React.ReactElement => {
  let daysCounter = 0;
  const timeFontSize = getFontSize(intervals.length);

  return (
    <Box
      className={`${departureLocation.label}-${arrivalLocation.label}-header`}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      width={`${tripContainerWidth + intervalWidth}px`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      marginLeft={`-${intervalWidth / 2}px`}
    >
      <Box flexBasis="100%" display="flex" flexDirection="row">
        {intervals.map((interval) => {
          if (interval % 24 === 0 && interval !== 0) {
            daysCounter += 1;
          }

          return (
            <TimeCell
              interval={interval}
              intervalWidth={intervalWidth}
              tzOffset={tzOffset}
              startDate={startDate}
              daysCounter={daysCounter}
              timeFontSize={timeFontSize}
              departureAirportCode={departureLocation.label}
              arrivalAirportCode={arrivalLocation.label}
              key={`interval-header-${interval}`}
            />
          );
        })}
      </Box>
      <TimelineSlider
        intervals={intervals}
        intervalWidth={intervalWidth}
        startDate={startDate}
        onRangeChange={onSliderChange}
        tripCount={tripCount}
        disabled={sliderDisabled}
        timezoneOffset={tzOffset}
        tripContainerWidth={tripContainerWidth}
      />
    </Box>
  );
};

export default React.memo(TimelineHeader, (previous, next) => {
  return isEqual(previous, next);
});
