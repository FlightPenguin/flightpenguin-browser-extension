import { Box, List, Tag, Text } from "bumbag";
import React, { useState } from "react";

import { sendSelectedFlight } from "../../../shared/events";
import {
  getProcessedSearchResultFlightName,
  ProcessedFlightSearchResult,
} from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { FlightSelection } from "../FlightSelection";
import { FlightLegend } from "./FlightLegend";
import { FlightSegmentBox } from "./FlightSegment";
import { FlightSegment } from "./FlightSegment/FlightSegment";
import { getFlightSegments } from "./FlightSegment/utilities/getFlightSegments";
import { getSegmentContainerPositions } from "./FlightSegment/utilities/getSegmentContainerPositions";

interface TimelineRowProps {
  itinerary: ProcessedItinerary;
  flight: ProcessedFlightSearchResult;
  flightType: "DEPARTURE" | "RETURN";
  flightTimeContainerWidth: number;
  legendWidth: number;
  maxRowWidth: number;
  intervalCount: number;
  increment: number;
  startHourOffset: number;
  from: string;
  to: string;
  index: number;
  hide: boolean;
  onSelection: (details: FlightSelection) => void;
}

export const TimelineRow = ({
  itinerary,
  flight,
  flightType,
  legendWidth,
  flightTimeContainerWidth,
  maxRowWidth,
  intervalCount,
  increment,
  startHourOffset,
  from,
  to,
  index,
  hide,
  onSelection,
}: TimelineRowProps): React.ReactElement => {
  const [selected, setSelected] = useState(false);

  const flightSegments = getFlightSegments(
    flight,
    from,
    to,
    increment,
    startHourOffset,
    intervalCount,
    flightTimeContainerWidth,
  );
  const flightPenguinId = flight.id;
  const { left, right } = getSegmentContainerPositions(flightSegments);

  return (
    <List.Item
      data-name="flight-list-item"
      display={hide && !selected ? "none" : "flex"}
      boxSizing="border-flex"
      whiteSpace="nowrap"
      alignX="center"
      tabIndex={0}
      key={flightPenguinId}
      data-flightpenguin-id={flight.id}
      data-flight-name={getProcessedSearchResultFlightName(flight)}
      data-selected={selected}
      width={`${maxRowWidth}px`}
      onClick={() => {
        setSelected(true);
        onSelection({ flight, itinerary, flightPenguinId });
        sendSelectedFlight(flightType, flightPenguinId);
      }}
      role="group"
      cursor="pointer"
      marginBottom="0px"
      backgroundColor={index % 2 === 0 || selected ? "primaryTint" : "white"}
      minHeight="80px"
      _hover={selected ? {} : { backgroundColor: "primary200", zIndex: "999" }}
      _focus={selected ? {} : { backgroundColor: "primary200", zIndex: "999" }}
    >
      <FlightLegend legendWidth={legendWidth} itinerary={itinerary} flight={flight} />
      <Box
        data-name={"flight-container"}
        zIndex="1"
        position="relative"
        display="flex"
        alignX="center"
        width="100%"
        alignSelf="normal"
        flex={1}
      >
        <Box
          data-name="flight-segments"
          data-content={flight.duration}
          left={`${left}px`}
          display="flex"
          alignX="center"
          flexDirection={"column"}
          position="absolute"
          width={`${right - left}px`}
          marginTop="8px"
        >
          <Box height={`60px`} marginBottom="16px">
            <Text
              alignX="center"
              alignY="top"
              fontSize="100"
              visibility={selected ? "visible" : "hidden"}
              marginBottom="5px"
              border="1px solid #404040"
              borderWidth="0px 0px 1px 0px"
              width={`${right - left}px`}
              _groupFocus={{ visibility: "visible" }}
              _groupHover={{ visibility: "visible" }}
            >
              {flight.duration}
            </Text>
            {flightSegments.map((flightSegment: FlightSegment) => {
              return <FlightSegmentBox flightSegment={flightSegment} left={left} />;
            })}
          </Box>
        </Box>
        <Tag
          data-name="departure-time"
          palette="text"
          variant="outlined"
          size="medium"
          left={`${left - 117}px`}
          position="absolute"
          textAlign="right"
          visibility={selected ? "visible" : "hidden"}
          _groupHover={selected ? {} : { visibility: "visible" }}
          _groupFocus={selected ? {} : { visibility: "visible" }}
          backgroundColor="white"
          marginTop="-8px"
        >
          {flight.fromTime}
        </Tag>
        <Tag
          palette="text"
          variant="outlined"
          size="medium"
          data-name="arrival-time"
          left={`${right + 37}px`}
          position="absolute"
          visibility={selected ? "visible" : "hidden"}
          _groupHover={selected ? {} : { visibility: "visible" }}
          _groupFocus={selected ? {} : { visibility: "visible" }}
          backgroundColor="white"
          marginTop="-8px"
        >
          {flight.toTime}
        </Tag>
      </Box>
    </List.Item>
  );
};
