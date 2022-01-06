import { Badge, Box, List, Tag, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";

import { sendSelectedFlight } from "../../../shared/events";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { legendWidth, PaymentType, sidePaddingWidth } from "../../constants";
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
  paymentType: PaymentType;
  index: number;
  skeleton: boolean;
  selected: boolean;
  flightTimeContainerWidth: number;
  resultsContainerWidth: number;
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
  paymentType,
  index,
  selected,
  skeleton,
  flightTimeContainerWidth,
  resultsContainerWidth,
  onSelection,
}: TimelineRowProps): React.ReactElement => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const rowWidth = resultsContainerWidth - sidePaddingWidth * 2;

  const backgroundColor = index % 2 === 0 || selected ? "primaryTint" : "white";
  const bottomBorder = index % 2 === 1 ? "default" : "none";

  if (loading) {
    return (
      <List.Item
        width={`${rowWidth}px`}
        alignX="center"
        alignY="center"
        minHeight="90px"
        backgroundColor={backgroundColor}
        borderBottom={bottomBorder}
      />
    );
  }

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
  const intervalWidth = flightTimeContainerWidth / (intervalCount - 1);

  const rowHighlightStyle = selected
    ? {}
    : {
        backgroundColor: "primary200",
        zIndex: "999",
      };
  const showWhenSelected = selected ? "visible" : "hidden";
  const skeletonBlur = skeleton ? `blur(8px)` : "";
  const arrivalTextColor = flight.timezoneOffset ? "warning" : "black";
  const departureTextColor = flight.timezoneOffset ? "info" : "black";

  return (
    <List.Item
      data-name="flight-list-item"
      whiteSpace="nowrap"
      alignX="center"
      display="flex"
      tabIndex={0}
      width={`${rowWidth}px`}
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
      backgroundColor={backgroundColor}
      borderBottom={bottomBorder}
      minHeight="90px"
      filter={skeletonBlur}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _hover={rowHighlightStyle}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _focus={rowHighlightStyle}
    >
      <FlightLegend legendWidth={legendWidth} itinerary={itinerary} flight={flight} paymentType={paymentType} />
      <Box
        data-name={"flight-container"}
        position="relative"
        display="flex"
        alignX="center"
        width="100%"
        alignSelf="normal"
        flex={1}
        background={`repeating-linear-gradient(to right, #e6e6eb, #e6e6eb 3px, transparent 1px, transparent ${intervalWidth}px)`}
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
              visibility={showWhenSelected}
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
          left={`${left - 107}px`}
          position="absolute"
          textAlign="right"
          visibility={showWhenSelected}
          _groupHover={selected ? {} : { visibility: "visible" }}
          _groupFocus={selected ? {} : { visibility: "visible" }}
          backgroundColor="white"
          color={departureTextColor}
        >
          {flight.fromTime}
          {!!flight.timezoneOffset && (
            <Badge isAttached palette="info">
              {flightType === "DEPARTURE" ? from : to}
            </Badge>
          )}
        </Tag>
        <Tag
          palette="text"
          variant="outlined"
          size="medium"
          data-name="arrival-time"
          left={`${right + 27}px`}
          position="absolute"
          visibility={showWhenSelected}
          _groupHover={selected ? {} : { visibility: "visible" }}
          _groupFocus={selected ? {} : { visibility: "visible" }}
          backgroundColor="white"
          color={arrivalTextColor}
        >
          {flight.toLocalTime}
          {!!flight.timezoneOffset && (
            <Badge isAttached palette="warning">
              {flightType === "DEPARTURE" ? to : from}
            </Badge>
          )}
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
      flightTimeContainerWidth: previous.flightTimeContainerWidth,
    },
    {
      itineraryId: next.itinerary.id,
      flightId: next.flight.id,
      intervalCount: next.intervalCount,
      increment: next.increment,
      startHourOffset: next.startHourOffset,
      selected: next.selected,
      flightTimeContainerWidth: next.flightTimeContainerWidth,
    },
  );
});
