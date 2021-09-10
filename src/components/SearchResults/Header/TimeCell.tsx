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
}

export const TimeCell = ({
  interval,
  intervalWidth,
  tzOffset,
  startDate,
  daysCounter,
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
            <Text fontWeight="700">{getWeekdayName(date)}</Text>
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
};