import styled from "@emotion/styled";
import { Box, Text, Tooltip } from "bumbag";
import React from "react";

export interface FlightSegment {
  fromTime: string;
  toTime: string;
  from: string;
  to: string;
  isLayoverStop: boolean;
  operatingAirline: {
    display: string;
    color: string;
  };
  layout: {
    startPosition: number;
    width: number;
  };
}

interface FlightSegmentProps {
  flightSegment: FlightSegment;
}

const FlightSegmentContainer = styled(Box)`
  &:hover &::after,
  &:focus &::after {
    content: attr(data-content); /** ex: 1h 10m */
    position: absolute;
    text-align: center;
    width: 100%;
    top: -25px;
    color: #404040;
    font-weight: 700;
  }

  color: pink;
`;

const PinkBox = styled(Box)`
  &:hover {
    background-color: pink;
  }
`;

export const FlightSegmentBox = ({ flightSegment }: FlightSegmentProps): React.ReactElement => {
  return (
    <PinkBox
      className="flight-segment"
      display="flex"
      width={`${flightSegment.layout.width}px`}
      left={`${flightSegment.layout.startPosition}px`}
      key={`flight-segment-${getFlightSegmentId(flightSegment)}`}
      height="30px"
      position="absolute"
      tabIndex={-1}
      flexDirection="column"
    >
      <Box
        background={
          flightSegment.isLayoverStop
            ? "repeating-linear-gradient(45deg, rgba(125, 130, 162, 0.5), rgba(147, 153, 191, 0.5) 5px, rgba(122, 128, 165, 0.5) 5px, rgba(98, 105, 146, 0.5) 10px)"
            : undefined
        }
        backgroundColor={flightSegment.operatingAirline.color}
      >
        <Tooltip content={getFlightSegmentName(flightSegment)} hasArrow placement="bottom" tabIndex={-1}>
          <Box width={`${flightSegment.layout.width}px`}>
            <Text>&nbsp;</Text>
          </Box>
        </Tooltip>
      </Box>
      {flightSegment.isLayoverStop && (
        <Box>
          <Text alignX="center" fontSize="150">
            {flightSegment.from}
          </Text>
        </Box>
      )}
    </PinkBox>
  );
};

const getFlightSegmentName = (flight: FlightSegment): string => {
  let name = `${flight.operatingAirline.display} ${flight.fromTime} `;
  if (!flight.isLayoverStop) {
    name += `(${flight.from}) `;
  }
  name += `- ${flight.toTime}`;
  if (!flight.isLayoverStop) {
    name += ` (${flight.to})`;
  }
  return name;
};

const getFlightSegmentId = (flight: FlightSegment): string => {
  return `${flight.operatingAirline.display}-${flight.fromTime}-${flight.toTime}`;
};
