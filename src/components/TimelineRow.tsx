import { Box, List, Text, Tooltip } from "bumbag";
import React, { useState } from "react";

import AirlineMap from "../shared/nameMaps/airlineMap";
import { FlightDetails } from "../shared/types/FlightDetails";
import { FlightLeg } from "../shared/types/FlightLeg";
import { Itinerary } from "../shared/types/Itinerary";
import { convertTimeTo24HourClock } from "../utilityFunctions";

interface TimelineRowProps {
  itinerary: Itinerary;
  flightType: "DEPARTURE" | "RETURN";
  maxRowWidth: number;
  intervalCount: number;
  increment: number; // TODO: Better name!
  startHourOffset: number;
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void;
}

export const TimelineRow = ({
  itinerary,
  flightType,
  maxRowWidth,
  intervalCount,
  increment,
  startHourOffset,
  onClick,
}: TimelineRowProps): React.ReactElement => {
  const [selected, setSelected] = useState(false);

  const flight = flightType === "RETURN" ? itinerary.returnFlight : itinerary.departureFlight;
  const layovers = getLayovers(flight.layovers, increment, startHourOffset, intervalCount, maxRowWidth);
  const flightPenguinId = getFlightPenguinFlightId(flight);
  const { left, right } = getSegmentContainerPositions(layovers);

  return (
    <List.Item
      data-name="flight-list-item"
      display="flex"
      boxSizing="border-flex"
      whiteSpace="nowrap"
      alignX="center"
      border="1px solid #da1717"
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
    >
      <Box
        data-name="flight-legend"
        display="flex"
        boxSizing="border-box"
        whiteSpace="nowrap"
        alignX="center"
        width="350px"
        padding="major-1"
      >
        <Box data-name="flight-price">
          <Text fontSize="500" fontWeight="700">{`${itinerary.currency}${itinerary.fare}`}</Text>
        </Box>
        <Box
          data-name="airlines"
          display="flex"
          flexDirection="column"
          width="265px"
          paddingLeft="10px"
          whiteSpace="normal"
        >
          <Text data-name="primary-airline" whiteSpace="nowrap" width="200px">
            {flight.marketingAirline}
          </Text>
          {flight.operatingAirline && (
            <Text data-name="secondary-airline" fontSize="100" fontWeight="200" whiteSpace="normal" width="200px">
              {flight.operatingAirline}
            </Text>
          )}
        </Box>
      </Box>
      <Box data-name={"flight-container"} zIndex="1" position="relative" display="flex" alignX="center">
        <Box
          data-name="flight-segments"
          data-content={flight.duration}
          left={left}
          display="flex"
          alignX="center"
          position="absolute"
        >
          {layovers.map((layover) => {
            return (
              <Box
                key={`flight-segment-${getLayoverFlightId(layover)}`}
                data-name="flight-segment"
                width={`${layover.layout.width}px`}
                left={`${layover.layout.startPosition}px`}
                data-content={layover.from}
                backgroundColor={layover.operatingAirline.color}
                height="30px"
                position="absolute"
              >
                <Tooltip content={getLayoverFlightName(layover)} hasArrow placement="bottom">
                  <Box width={`${layover.layout.width}px`}>
                    <Text>&nbsp;</Text>
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
        <Box data-name="departure-time" left={`${left - 97 + 10}px`} position="absolute" textAlign="right">
          {flight.fromTime}
        </Box>
        <Box data-name="arrival-time" left={`${right + 10}px`} position="absolute">
          {flight.toTime}
        </Box>
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

const getLayoverFlightName = (flight: Layover): string => {
  return `${flight.operatingAirline.display} ${flight.fromTime}-${flight.toTime}`;
};

const getLayoverFlightId = (flight: Layover): string => {
  return `${flight.operatingAirline.display}-${flight.fromTime}-${flight.toTime}`;
};

interface Layover {
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

const getLayovers = (
  legs: FlightLeg[],
  increment: number,
  startHourOffset: number,
  intervalCount: number,
  maxRowWidth: number,
): Layover[] => {
  const layoversWithStops = [];
  for (let i = 0; i < legs.length - 1; i++) {
    const previousFlight = legs[i];
    const nextFlight = legs[i + 1];
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

  const lastFlight = legs[legs.length - 1];
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

  return layoversWithStops.map((layover) => {
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
      maxRowWidth,
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
  maxRowWidth: number,
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
  const pxPerMinute = maxRowWidth / totalMinutes;
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

const getSegmentContainerPositions = (layovers: Layover[]): { left: number; right: number } => {
  const firstLeg = layovers[0];
  const lastLeg = layovers.slice(-1)[0];

  const left = firstLeg.layout.startPosition;
  const right = lastLeg.layout.startPosition + lastLeg.layout.width;
  return { left, right };
};
