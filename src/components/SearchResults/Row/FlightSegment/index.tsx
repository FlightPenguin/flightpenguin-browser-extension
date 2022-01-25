import { Box, Text, Tooltip } from "bumbag";
import React from "react";

import { FlightSegment } from "./FlightSegment";
import { getFlightSegmentTooltipText } from "./utilities/getFlightSegmentTooltipText";

interface FlightSegmentBoxProps {
  flightSegment: FlightSegment;
  left: number;
}

export const FlightSegmentBox = ({ flightSegment, left }: FlightSegmentBoxProps): React.ReactElement => {
  return (
    <Box
      display="flex"
      width={`${flightSegment.layout.width}px`}
      left={`${flightSegment.layout.startPosition - left}px`}
      key={`flight-segment-${flightSegment.id}`}
      height="30px"
      position="absolute"
      tabIndex={-1}
      flexDirection="column"
    >
      <Box
        data-name="flight-segment"
        background={
          flightSegment.isLayoverStop
            ? "repeating-linear-gradient(45deg, rgba(125, 130, 162, 0.5), rgba(147, 153, 191, 0.5) 5px, rgba(122, 128, 165, 0.5) 5px, rgba(98, 105, 146, 0.5) 10px)"
            : undefined
        }
        backgroundColor={flightSegment.operatingAirline.color}
      >
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          content={getFlightSegmentTooltipText(flightSegment)}
          hasArrow
          placement="bottom"
          tabIndex={-1}
          tooltipContentProps={{ whiteSpace: "pre" }}
        >
          <Box width={`${flightSegment.layout.width}px`}>
            <Text>&nbsp;</Text>
          </Box>
        </Tooltip>
      </Box>
      {flightSegment.isLayoverStop && (
        <Box>
          <Text alignX="center" fontSize="clamp(.4375rem, 1vw, .875rem)">
            {flightSegment.from}
          </Text>
        </Box>
      )}
    </Box>
  );
};
