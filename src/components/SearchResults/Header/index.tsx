import { Box } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { flightTimeContainerWidth } from "../../constants";
import { TimeCell } from "./TimeCell";
import { getFlightInfo } from "./utilities/getFlightInfo";
import { getHeaderTime } from "./utilities/getHeaderTime";

interface TimelineHeaderProps {
  formData: FlightSearchFormData;
  flightType: "DEPARTURE" | "RETURN";
  intervals: number[];
  tzOffset: number;
}

const TimelineHeader = ({ formData, flightType, intervals, tzOffset }: TimelineHeaderProps): React.ReactElement => {
  let daysCounter = 0;
  const intervalWidth = flightTimeContainerWidth / (intervals.length - 1);
  const { startDate, departureAirportCode, arrivalAirportCode } = getFlightInfo(formData, flightType);
  const headerOffset = tzOffset ? 100 : 70;

  return (
    <Box className={`${flightType.toLowerCase()}-header`} position="relative" width={`${flightTimeContainerWidth}px`}>
      <Box position="absolute" top={`-${headerOffset}px`}>
        {intervals.map((interval, index) => {
          if (interval % 24 === 0 && interval !== 0) {
            daysCounter += 1;
          }

          return (
            <TimeCell
              index={index}
              interval={interval}
              intervalWidth={intervalWidth}
              tzOffset={tzOffset}
              startDate={startDate}
              daysCounter={daysCounter}
              departureAirportCode={departureAirportCode}
              arrivalAirportCode={arrivalAirportCode}
              key={`interval-header-${interval}`}
            />
          );
        })}
      </Box>
      <Box
        className={`${flightType.toLowerCase()}-dividers`}
        position="absolute"
        display="flex"
        flexDirection="row"
        height="100%"
      >
        {intervals.map((interval, index) => {
          const startX = intervalWidth * index;
          const time = getHeaderTime(interval);
          const isMidnight = time.toUpperCase() === "12 AM";
          return (
            <Box
              key={`interval-divider-${startX}`}
              left={`${startX}px`}
              width={`${intervalWidth}px`}
              height="100%"
              boxShadow={`inset ${isMidnight ? 5 : 3}px 0 0 0 #e6e6eb`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default React.memo(TimelineHeader, (previous, next) => {
  return isEqual(previous, next);
});
