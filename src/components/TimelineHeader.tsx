import { Box, Text, Tooltip } from "bumbag";
import React, { useState } from "react";

import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { getWeekdayName } from "../shared/utilities/getWeekdayName";
import { convertMinutesTo12HourClock } from "../utilityFunctions";

interface TimelineHeaderProps {
  formData: FlightSearchFormData;
  flightType: "DEPARTURE" | "RETURN";
  intervals: number[];
  tzOffset: number;
  maxRowWidth: number;
}

export const TimelineHeader = ({
  formData,
  flightType,
  intervals,
  tzOffset,
  maxRowWidth,
}: TimelineHeaderProps): React.ReactElement => {
  let daysCounter = 0;
  const intervalWidth = maxRowWidth / (intervals.length - 1);
  const { startDate, departureAirportCode, arrivalAirportCode } = getFlightInfo(formData, flightType);

  return (
    <Box data-name={`${flightType.toLowerCase()}-header`} position="relative" width="1067px">
      <Box position="absolute" top="-100px">
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
            <Box key={`interval-wrapper-${intervalDate.toLocaleDateString("en-US")}-${time}`}>
              <Box
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
                  <Text>{time.toLowerCase()}</Text>
                </Tooltip>
                {tzOffset && (
                  <Tooltip content={`Time at ${arrivalAirportCode}`} hasArrow placement="right">
                    <Text>{offsetTime.toLowerCase()}</Text>
                  </Tooltip>
                )}
              </Box>
              <Box data-name="interval-line" />
            </Box>
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
