import { Box, List, Tag, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";
import { debug } from "webpack";

import { sendSelectedFlight } from "../../../shared/events";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { containerWidth, flightTimeContainerWidth, legendWidth } from "../../constants";
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
  intervalCount: number;
  increment: number;
  startHourOffset: number;
  from: string;
  to: string;
  index: number;
  skeleton: boolean;
  selected: boolean;
  onSelection: (details: FlightSelection) => void;
}

const TimelineRow = ({
  itinerary,
  flight,
  flightType,
  intervalCount,
  increment,
  startHourOffset,
  from,
  to,
  index,
  selected,
  skeleton,
  onSelection,
}: TimelineRowProps): React.ReactElement => {
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
      whiteSpace="nowrap"
      alignX="center"
      display="flex"
      tabIndex={0}
      key={flightPenguinId}
      width={`${containerWidth}px`}
      onClick={() => {
        if (skeleton || selected) {
          return;
        }
        onSelection({ flight, itinerary, flightPenguinId });
        sendSelectedFlight(flightType, flightPenguinId);
      }}
      role="group"
      cursor={skeleton ? "not-allowed" : selected ? "auto" : "pointer"}
      marginBottom="0px"
      backgroundColor={index % 2 === 0 || selected ? "primaryTint" : "white"}
      minHeight="80px"
      filter={skeleton ? `blur(8px)` : ""}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _hover={
        selected
          ? {}
          : {
              backgroundColor: "primary200",
              zIndex: "999",
            }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _focus={
        selected
          ? {}
          : {
              backgroundColor: "primary200",
              zIndex: "999",
            }
      }
    >
      <FlightLegend legendWidth={legendWidth} itinerary={itinerary} flight={flight} />
      <Box
        data-name={"flight-container"}
        position="relative"
        display="flex"
        alignX="center"
        width="100%"
        alignSelf="normal"
        flex={1}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        zIndex="1"
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
              return <FlightSegmentBox flightSegment={flightSegment} left={left} key={flightSegment.id} />;
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

export default React.memo(TimelineRow, (previous, next) => {
  return isEqual(
    {
      itineraryId: previous.itinerary.id,
      flightId: previous.flight.id,
      intervalCount: previous.intervalCount,
      increment: previous.increment,
      startHourOffset: previous.startHourOffset,
      selected: previous.selected,
    },
    {
      itineraryId: next.itinerary.id,
      flightId: next.flight.id,
      intervalCount: next.intervalCount,
      increment: next.increment,
      startHourOffset: next.startHourOffset,
      selected: next.selected,
    },
  );
});
