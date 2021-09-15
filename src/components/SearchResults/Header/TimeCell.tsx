import { Box, Text, Tooltip } from "bumbag";
import React from "react";

import { getWeekdayName } from "../../../shared/utilities/getWeekdayName";
import { getHeaderTime } from "./utilities/getHeaderTime";

interface TimeCellProps {
  index: number;
  interval: number;
  intervalWidth: number;
  tzOffset: number;
  startDate: Date;
  daysCounter: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  timeFontSize: string;
}

export const TimeCell = ({
  interval,
  intervalWidth,
  tzOffset,
  startDate,
  daysCounter,
  timeFontSize,
  departureAirportCode,
  arrivalAirportCode,
}: TimeCellProps) => {
  const time = getHeaderTime(interval);
  const offsetTime = getHeaderTime(interval, tzOffset);
  const isMidnight = time.toUpperCase() === "12 AM";

  const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() + daysCounter);

  return (
    <Box
      className="interval"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignX="center"
      width={`${intervalWidth}px`}
      position="relative"
    >
      {isMidnight ? (
        <Box position="relative" border="default" padding="major-1" borderRadius="4">
          <Tooltip content={date.toLocaleDateString("en-US")} hasArrow placement="right">
            <Text fontWeight="700" tabIndex={-1}>
              {getWeekdayName(date)}
            </Text>
          </Tooltip>
        </Box>
      ) : (
        <Text padding="major-1" tabIndex={-1}>
          &nbsp;
        </Text>
      )}
      <Tooltip content={`Time at ${departureAirportCode}`} hasArrow placement="right">
        <Text fontSize={timeFontSize} fontWeight={isMidnight ? "700" : "400"} tabIndex={-1}>
          {time.toLowerCase()}
        </Text>
      </Tooltip>
      {!!tzOffset && (
        <Tooltip content={`Time at ${arrivalAirportCode}`} hasArrow placement="right">
          <Text fontSize={timeFontSize} fontWeight={isMidnight ? "700" : "400"} tabIndex={-1}>
            {offsetTime.toLowerCase()}
          </Text>
        </Tooltip>
      )}
    </Box>
  );
};
