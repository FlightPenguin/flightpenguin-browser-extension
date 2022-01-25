import { Box, Text, Tooltip } from "bumbag";
import { addDays, addMinutes, format } from "date-fns";
import React from "react";

import { FlightType } from "../../../background/constants";
import { getWeekdayName } from "../../../shared/utilities/getWeekdayName";

interface TimeCellProps {
  interval: number;
  intervalWidth: number;
  tzOffset: number;
  startDate: Date;
  daysCounter: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  timeFontSize: string;
  flightType: FlightType;
}

export const TimeCell = ({
  interval,
  intervalWidth,
  tzOffset,
  startDate,
  daysCounter,
  departureAirportCode,
  arrivalAirportCode,
  timeFontSize,
  flightType,
}: TimeCellProps) => {
  const multiplier = flightType === "DEPARTURE" ? -1 : 1;

  const date = addDays(startDate, daysCounter);
  const minutes = interval * 60;
  const time = addMinutes(date, minutes);
  const displayTime = format(time, "h aaa");
  const offsetTime = addMinutes(time, tzOffset * multiplier);
  const displayOffsetTime = format(offsetTime, "h aaa");

  const isMidnight = displayTime.toUpperCase() === "12 AM";

  return (
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
      left={"0px"}
      data-name="interval"
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
      <Box display="flex" justifyContent="center" width="100%" data-name="text-wrapper">
        <Text
          flex={1}
          fontSize={timeFontSize}
          fontWeight={isMidnight ? "700" : "400"}
          tabIndex={-1}
          color={tzOffset ? "info" : "black"}
        >
          {tzOffset && interval === 0 ? departureAirportCode : ""}
        </Text>
        <Text
          fontSize={timeFontSize}
          fontWeight={isMidnight ? "700" : "400"}
          tabIndex={-1}
          color={tzOffset ? "info" : "black"}
        >
          {displayTime.toLowerCase()}
        </Text>
        <Text
          flex={1}
          fontSize={timeFontSize}
          fontWeight={isMidnight ? "700" : "400"}
          tabIndex={-1}
          color={tzOffset ? "info" : "black"}
        />
      </Box>
      {!!tzOffset && (
        <Box display="flex" justifyContent="center" width="100%" data-name="text-wrapper">
          <Text
            flex={1}
            fontSize={timeFontSize}
            fontWeight={isMidnight ? "700" : "400"}
            tabIndex={-1}
            color={tzOffset ? "warning" : "black"}
          >
            {tzOffset && interval === 0 ? arrivalAirportCode : ""}
          </Text>
          <Text fontSize={timeFontSize} fontWeight={isMidnight ? "700" : "400"} tabIndex={-1} color="warning">
            {displayOffsetTime.toLowerCase()}
          </Text>
          <Text
            flex={1}
            fontSize={timeFontSize}
            fontWeight={isMidnight ? "700" : "400"}
            tabIndex={-1}
            color={tzOffset ? "warning" : "black"}
          />
        </Box>
      )}
    </Box>
  );
};
