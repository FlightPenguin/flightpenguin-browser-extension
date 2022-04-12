import { Box, Text, Tooltip } from "bumbag";
import { addDays, addHours, addMinutes, format } from "date-fns";
import React from "react";

import { getWeekdayName } from "../../../shared/utilities/getWeekdayName";

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
  index,
  interval,
  intervalWidth,
  tzOffset,
  startDate,
  daysCounter,
  departureAirportCode,
  arrivalAirportCode,
  timeFontSize,
}: TimeCellProps): React.ReactElement => {
  const date = addDays(startDate, daysCounter);
  const time = addHours(date, interval);
  const displayTime = format(time, "h aaa");
  const offsetTime = addMinutes(time, tzOffset);
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
      {isMidnight || index === 0 ? (
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
          boxSizing="border-box"
          color={tzOffset ? "info" : "black"}
          flex={1}
          fontSize={timeFontSize}
          fontWeight={isMidnight ? "700" : "400"}
          paddingRight="minor-1"
          tabIndex={-1}
          textAlign="right"
        >
          {tzOffset && index === 0 ? departureAirportCode : ""}
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
          boxSizing="border-box"
          color={tzOffset ? "info" : "black"}
          flex={1}
          fontSize={timeFontSize}
          fontWeight={isMidnight ? "700" : "400"}
          paddingLeft="minor-1"
          tabIndex={-1}
          textAlign="left"
        />
      </Box>
      {!!tzOffset && (
        <Box display="flex" justifyContent="center" width="100%" data-name="text-wrapper">
          <Text
            boxSizing="border-box"
            color={tzOffset ? "warning" : "black"}
            flex={1}
            fontSize={timeFontSize}
            fontWeight={isMidnight ? "700" : "400"}
            paddingRight="minor-1"
            tabIndex={-1}
            textAlign="right"
          >
            {tzOffset && index === 0 ? arrivalAirportCode : ""}
          </Text>
          <Text fontSize={timeFontSize} fontWeight={isMidnight ? "700" : "400"} tabIndex={-1} color="warning">
            {displayOffsetTime.toLowerCase()}
          </Text>
          <Text
            boxSizing="border-box"
            color={tzOffset ? "warning" : "black"}
            flex={1}
            fontSize={timeFontSize}
            fontWeight={isMidnight ? "700" : "400"}
            paddingLeft="minor-1"
            tabIndex={-1}
            textAlign="left"
          />
        </Box>
      )}
    </Box>
  );
};
