import { Box, List, Tag, Text, Tooltip } from "bumbag";
import React, { useState } from "react";

import AirlineMap from "../shared/nameMaps/airlineMap";
import { FlightDetails } from "../shared/types/FlightDetails";
import { Itinerary } from "../shared/types/Itinerary";
import { convertTimeTo24HourClock } from "../utilityFunctions";

interface TimelineRowProps {
  itinerary: Itinerary;
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
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void;
}

export const TimelineRow = ({
  itinerary,
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
  onClick,
}: TimelineRowProps): React.ReactElement => {
  const [selected, setSelected] = useState(false);

  const flight = flightType === "RETURN" ? itinerary.returnFlight : itinerary.departureFlight;

  const flightSegments = getFlightSegments(
    flight,
    from,
    to,
    increment,
    startHourOffset,
    intervalCount,
    flightTimeContainerWidth,
  );
  const flightPenguinId = getFlightPenguinFlightId(flight);
  const { left, right } = getSegmentContainerPositions(flightSegments);

  return (
    <List.Item
      data-name="flight-list-item"
      display="flex"
      boxSizing="border-flex"
      whiteSpace="nowrap"
      alignX="center"
      tabIndex={0}
      key={flightPenguinId}
      data-flightpenguin-id={flightPenguinId}
      data-flight-name={getFlightName(flight)}
      data-window-id={itinerary.windowId}
      data-tab-id={itinerary.tabId}
      data-provider={itinerary.provider}
      data-selected={selected}
      width={`${maxRowWidth}px`}
      onClick={(event) => {
        setSelected(true);
        onClick(event);
      }}
      role="group"
      cursor="pointer"
      marginBottom="0px"
      backgroundColor={index % 2 === 1 ? "white" : "primaryTint"}
      _hover={{ backgroundColor: "primary200", zIndex: "999" }}
      _focus={{ backgroundColor: "primary200", zIndex: "999" }}
    >
      <Box
        data-name="flight-legend"
        display="flex"
        boxSizing="border-box"
        whiteSpace="nowrap"
        alignX="center"
        width={`${legendWidth}px`}
        padding="major-1"
      >
        <Box data-name="flight-price">
          <Text fontSize="500" fontWeight="700">{`${itinerary.fare}`}</Text>
        </Box>
        <Box
          data-name="airlines"
          display="flex"
          flexDirection="column"
          width="265px"
          paddingLeft="10px"
          whiteSpace="normal"
        >
          <Text data-name="primary-airline" whiteSpace="normal" width="185px">
            {flight.marketingAirline}
          </Text>
          {flight.operatingAirline && (
            <Text data-name="secondary-airline" fontSize="100" fontWeight="200" whiteSpace="normal" maxWidth="185px">
              {flight.operatingAirline}
            </Text>
          )}
        </Box>
      </Box>
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
          left={left}
          display="flex"
          alignX="center"
          position="absolute"
        >
          {flightSegments.map((flightSegment) => {
            return (
              <Box
                key={`flight-segment-${getFlightSegmentId(flightSegment)}`}
                data-name="flight-segment"
                width={`${flightSegment.layout.width}px`}
                left={`${flightSegment.layout.startPosition}px`}
                data-content={flightSegment.from}
                background={
                  flightSegment.isLayoverStop
                    ? "repeating-linear-gradient(45deg, rgba(125, 130, 162, 0.5), rgba(147, 153, 191, 0.5) 5px, rgba(122, 128, 165, 0.5) 5px, rgba(98, 105, 146, 0.5) 10px)"
                    : undefined
                }
                backgroundColor={flightSegment.operatingAirline.color}
                height="30px"
                position="absolute"
                tabIndex={-1}
              >
                <Tooltip content={getFlightSegmentName(flightSegment)} hasArrow placement="bottom" tabIndex={-1}>
                  <Box width={`${flightSegment.layout.width}px`}>
                    <Text>&nbsp;</Text>
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
        <Tag
          data-name="departure-time"
          palette="text"
          variant="outlined"
          size="medium"
          left={`${left - 117}px`}
          position="absolute"
          textAlign="right"
          visibility="hidden"
          _groupHover={{ visibility: "visible" }}
          _groupFocus={{ visibility: "visible" }}
          backgroundColor="white"
        >
          {flight.fromTime}
        </Tag>
        <Tag
          palette="text"
          variant="outlined"
          size="medium"
          data-name="arrival-time"
          left={`${right + 35}px`}
          position="absolute"
          visibility="hidden"
          _groupFocus={{ visibility: "visible" }}
          _groupHover={{ visibility: "visible" }}
          backgroundColor="white"
        >
          {flight.toTime}
        </Tag>
      </Box>
    </List.Item>
  );
};

const getFlightPenguinFlightId = (flight: FlightDetails): string => {
  return `${flight.operatingAirline}-${flight.fromTime}-${flight.toTime}`;
};

const getFlightName = (flight: FlightDetails): string => {
  return `${flight.operatingAirline} ${flight.fromTime}-${flight.toTime}`;
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

interface FlightSegment {
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

const getFlightSegments = (
  flight: FlightDetails,
  tripStartAirport: string,
  tripEndAirport: string,
  increment: number,
  startHourOffset: number,
  intervalCount: number,
  containerWidth: number,
): FlightSegment[] => {
  const layoversWithStops = [];
  for (let i = 0; i < flight.layovers.length - 1; i++) {
    const previousFlight = flight.layovers[i];
    const nextFlight = flight.layovers[i + 1];
    const { toTime: fromTime, to: from } = previousFlight;
    const { fromTime: toTime, from: to } = nextFlight;

    layoversWithStops.push({
      fromTime: previousFlight.fromTime,
      toTime: previousFlight.toTime,
      from: previousFlight.from,
      to: previousFlight.to,
      isLayoverStop: false,
      operatingAirline: AirlineMap.getAirlineDetails(previousFlight.operatingAirline),
    });
    layoversWithStops.push({
      fromTime,
      toTime,
      from,
      to,
      isLayoverStop: true,
      operatingAirline: {
        display: `Layover at ${from}.`,
        color: "transparent",
      },
    });
  }

  const lastFlight =
    layoversWithStops.length > 0
      ? flight.layovers[flight.layovers.length - 1]
      : {
          ...flight,
          from: tripStartAirport,
          to: tripEndAirport,
          operatingAirline: flight.marketingAirline || flight.operatingAirline,
        };
  layoversWithStops.push({
    fromTime: lastFlight.fromTime,
    toTime: lastFlight.toTime,
    from: lastFlight.from,
    to: lastFlight.to,
    isLayoverStop: false,
    operatingAirline: AirlineMap.getAirlineDetails(lastFlight.operatingAirline),
  });

  let startDayOffset = 0;
  let endDayOffset = 0;

  return layoversWithStops.map((layover, index) => {
    if (endDayOffset > startDayOffset) {
      startDayOffset = endDayOffset;
    }

    const endsNextDay = layover.toTime.match(/(\+\d)/);
    const startsNextDay = layover.fromTime.match(/(\+\d)/);
    if (!layover.isLayoverStop) {
      if (startsNextDay) {
        const [_, startDays] = startsNextDay[0].split("+");
        // 24 hours in a day but we need to lay out the time bar on the correct day
        startDayOffset += Number(startDays);
        // the rightmost position of the time bar aka when the flight arrives, will be relative to when the flight departed
        endDayOffset = startDayOffset;
      }
      if (endsNextDay) {
        const [_, endDays] = endsNextDay[0].split("+");
        endDayOffset += Number(endDays);
      }
    }

    // eslint-disable-next-line prefer-const
    let { width, startX } = getPosition(
      layover.fromTime,
      layover.toTime,
      startDayOffset,
      endDayOffset,
      increment,
      startHourOffset,
      intervalCount,
      containerWidth,
    );

    if (layover.isLayoverStop) {
      width += 1;
    }
    return { ...layover, layout: { width: width, startPosition: startX } };
  });
};

function getPosition(
  fromTime: string,
  toTime: string,
  startDayOffset: number,
  endDayOffset: number,
  increment: number,
  startHourOffset: number,
  intervalCount: number,
  containerWidth: number,
): { width: number; startX: number } {
  /**
   * Basically this is what's happening here:
   * Intervals for 24 hours
   * [12am, 6am, 12pm, 6pm, 12am]
   * [0px, 100px, 200px, 300px, 400px]
   * If we want the whole thing to be 400 px, 400 px / 24 hours = 33.33 px/hr
   * So 6:05am would be (33.33 * 6) + (5 * 33.33/60) = start position in pixels
   * width = end position in pixels - start position in pixels
   */
  const totalHours = (intervalCount - 1) * increment;
  const totalMinutes = totalHours * 60;
  const pxPerMinute = containerWidth / totalMinutes;
  const minutesPerHour = 60;
  const minutesPerDay = minutesPerHour * 24;
  const positionAtMidnight = pxPerMinute * minutesPerDay;

  const startMinutesOffset = startDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight starts on a following day, happens with layovers
  const endMinutesOffset = endDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight ends on a following day, happens with long distance flights and layovers

  const fromTimeAttrs = convertTimeTo24HourClock(fromTime);
  const startTimeInMinutes = startMinutesOffset + fromTimeAttrs.minutes + fromTimeAttrs.hours * minutesPerHour;

  const toTimeAttrs = convertTimeTo24HourClock(toTime);
  const endTimeInMinutes = endMinutesOffset + toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;

  const startPositionPx = startTimeInMinutes * pxPerMinute;
  let endPositionPx = endTimeInMinutes * pxPerMinute;

  if (endPositionPx < startPositionPx) {
    endPositionPx += positionAtMidnight;
  }

  const timeBarWidth = endPositionPx - startPositionPx;
  return { width: timeBarWidth, startX: startPositionPx };
}

const getSegmentContainerPositions = (layovers: FlightSegment[]): { left: number; right: number } => {
  const firstLeg = layovers[0];
  const lastLeg = layovers.slice(-1)[0];

  const left = firstLeg.layout.startPosition;
  const right = lastLeg.layout.startPosition + lastLeg.layout.width;
  return { left, right };
};
