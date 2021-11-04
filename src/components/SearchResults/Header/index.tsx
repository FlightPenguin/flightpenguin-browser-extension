import { Box, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { flightTimeContainerWidth } from "../../constants";
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
}

const TimelineHeader = ({
  formData,
  flightType,
  intervals,
  tzOffset,
  onSliderChange,
  sliderDisabled,
  flightCount,
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
        {!!tzOffset && (
          <Box
            className="interval"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignX="center"
            width={`${intervalWidth}px`}
            position="relative"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            left={`-${intervalWidth}px`}
          >
            <Text fontSize={timeFontSize} padding="major-1" tabIndex={-1}>
              &nbsp;
            </Text>
            <Text fontSize={timeFontSize} tabIndex={-1} color="info" fontWeight="700" width="100%" textAlign="right">
              {departureAirportCode}
            </Text>
            <Text fontSize={timeFontSize} tabIndex={-1} color="warning" fontWeight="700" width="100%" textAlign="right">
              {arrivalAirportCode}
            </Text>
          </Box>
        )}
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
        multipleTimezones={!!tzOffset}
      />
    </Box>
  );
};

export default React.memo(TimelineHeader, (previous, next) => {
  return isEqual(previous, next);
});
