import { Box, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import TimelineSlider from "../Slider";
import { TimeCell } from "./TimeCell";
import { getFlightInfo } from "./utilities/getFlightInfo";
import { getFontSize } from "./utilities/getFontSize";

interface TimelineHeaderProps {
  formData: FlightSearchFormData;
  flightType: "DEPARTURE" | "RETURN";
  intervals: number[];
  tzOffset: number;
  onSliderChange: (minDate: Date, maxDate: Date) => void;
  sliderDisabled: boolean;
  flightCount: number;
  flightTimeContainerWidth: number;
}

const TimelineHeader = ({
  formData,
  flightType,
  intervals,
  tzOffset,
  onSliderChange,
  sliderDisabled,
  flightCount,
  flightTimeContainerWidth,
}: TimelineHeaderProps): React.ReactElement => {
  let daysCounter = 0;
  const intervalWidth = flightTimeContainerWidth / (intervals.length - 1);
  const { startDate, departureAirportCode, arrivalAirportCode } = getFlightInfo(formData, flightType);
  const timeFontSize = getFontSize(intervals.length);

  return (
    <Box
      className={`${flightType.toLowerCase()}-header`}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      width={`${flightTimeContainerWidth + intervalWidth}px`}
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
              departureAirportCode={departureAirportCode}
              arrivalAirportCode={arrivalAirportCode}
              flightType={flightType}
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
        flightCount={flightCount}
        disabled={sliderDisabled}
        timezoneOffset={tzOffset}
        flightTimeContainerWidth={flightTimeContainerWidth}
        flightType={flightType}
      />
    </Box>
  );
};

export default React.memo(TimelineHeader, (previous, next) => {
  return isEqual(previous, next);
});
