import { Box, Text, Tooltip } from "bumbag";
import React from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { getWeekdayName } from "../../../shared/utilities/getWeekdayName";
import { flightTimeContainerWidth } from "../../constants";
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
    <Box data-name={`${flightType.toLowerCase()}-header`} position="relative" width={`${flightTimeContainerWidth}px`}>
      <Box position="absolute" top={`-${headerOffset}px`}>
        {intervals.map((interval, index) => {
          const time = getHeaderTime(interval);
          const offsetTime = getHeaderTime(interval, tzOffset);
          const isMidnight = time.toUpperCase() === "12 AM";

          if (isMidnight && index !== 0) {
            daysCounter += 1;
          }

          const intervalDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDay() + daysCounter,
          );
          const startX = intervalWidth * index;

          return (
            <Box
              key={`interval-wrapper-${intervalDate.toLocaleDateString("en-US")}-${time}`}
              data-name="interval"
              left={`${startX}px`}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              alignX="center"
              marginLeft="-17px"
              width="48px"
              position="absolute"
            >
              {isMidnight ? (
                <Box position="relative" border="default" padding="major-1" borderRadius="4">
                  <Tooltip content={intervalDate.toLocaleDateString("en-US")} hasArrow placement="right">
                    <Text fontWeight="700">{getWeekdayName(intervalDate)}</Text>
                  </Tooltip>
                </Box>
              ) : (
                <Text padding="major-1">&nbsp;</Text>
              )}
              <Tooltip content={`Time at ${departureAirportCode}`} hasArrow placement="right">
                <Text fontWeight={isMidnight ? "700" : "400"}>{time.toLowerCase()}</Text>
              </Tooltip>
              {!!tzOffset && (
                <Tooltip content={`Time at ${arrivalAirportCode}`} hasArrow placement="right">
                  <Text fontWeight={isMidnight ? "700" : "400"}>{offsetTime.toLowerCase()}</Text>
                </Tooltip>
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        data-name={`${flightType.toLowerCase()}-dividers`}
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
  return (
    previous.flightType === next.flightType &&
    previous.intervals === next.intervals &&
    previous.tzOffset === next.tzOffset &&
    previous.formData === next.formData
  );
});
