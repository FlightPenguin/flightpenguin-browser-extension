import { Box, Icon, Input, Text } from "bumbag";
import React from "react";

import { FlightType } from "../../background/constants";
import { getStandardizedFormatDate } from "../utilities/forms/getStandardizedFormatDate";

interface TimeCellProps {
  flightType: FlightType;
  airport: string;
  date: string | undefined;
}

export const TimeCell = ({ flightType, airport, date }: TimeCellProps): React.ReactElement => {
  const icon = `solid-plane-${flightType === "DEPARTURE" ? "departure" : "arrival"}`;
  const planeIconLabel = flightType === "DEPARTURE" ? "Departure information" : "Destination and return information";
  const locationIconLabel = `${flightType === "DEPARTURE" ? "Departure" : "Destination"} airport`;
  const calendarIconLabel = `${flightType === "DEPARTURE" ? "Departure" : "Return"} date`;

  return (
    <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
      <Box>
        <Input.Icon icon={icon} aria-label={planeIconLabel} fontSize="300" color="black" alignX="left" />
      </Box>
      <Box display="flex" flexDirection="column" paddingLeft="10px" paddingRight="10px" whiteSpace="nowrap">
        <Text whiteSpace="normal">
          <Icon aria-label={locationIconLabel} icon="solid-map-marker-alt" marginRight="major-1" />
          {airport}
        </Text>
        {date && (
          <Text fontSize="100" fontWeight="200" whiteSpace="nowrap">
            <Icon aria-label={calendarIconLabel} icon="regular-calendar" marginRight="major-1" />
            {getStandardizedFormatDate(date)}
          </Text>
        )}
      </Box>
    </Box>
  );
};
