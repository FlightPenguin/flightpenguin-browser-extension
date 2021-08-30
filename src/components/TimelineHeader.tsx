import { Box, Text, Tooltip } from "bumbag";
import React from "react";

import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { getWeekdayName } from "../shared/utilities/getWeekdayName";
import { convertMinutesTo12HourClock } from "../utilityFunctions";

interface TimelineHeaderProps {
  formData: FlightSearchFormData;
  flightType: "DEPARTURE" | "RETURN";
  intervals: number[];
  tzOffset: number;
  flightTimeContainerWidth: number;
}

export const TimelineHeader = ({
  formData,
  flightType,
  intervals,
  tzOffset,
  flightTimeContainerWidth,
}: TimelineHeaderProps): React.ReactElement => {
  let daysCounter = 0;
  const intervalWidth = flightTimeContainerWidth / (intervals.length - 1);
  const { startDate, departureAirportCode, arrivalAirportCode } = getFlightInfo(formData, flightType);
  const headerOffset = tzOffset ? 100 : 70;

  return (
    <Box data-name={`${flightType.toLowerCase()}-header`} position="relative" width="1067px">
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
              borderLeft={isMidnight ? "5px solid #e6e6eb" : "3px solid #e6e6eb"}
              zIndex={-1}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const getHeaderTime = (interval: number, offset?: number): string => {
  let timeMinutes = interval * 60;
  if (offset) {
    timeMinutes -= offset;
  }
  const time = convertMinutesTo12HourClock(Math.abs(timeMinutes));
  return time.replace(":00", "");
};

const getFlightInfo = (formData: FlightSearchFormData, flightType: "DEPARTURE" | "RETURN") => {
  let startDate;
  let departureAirportCode;
  let arrivalAirportCode;
  if (flightType === "DEPARTURE") {
    startDate = formData.fromDate;
    departureAirportCode = formData.from;
    arrivalAirportCode = formData.to;
  } else {
    startDate = formData.toDate;
    departureAirportCode = formData.to;
    arrivalAirportCode = formData.from;
  }

  const [year, month, day] = startDate.split("-").map((date: string) => Number(date));
  return {
    startDate: new Date(year, month, day),
    departureAirportCode,
    arrivalAirportCode,
  };
};
