import { ProcessedFlightSearchResult } from "../../../../../shared/types/ProcessedFlightSearchResult";
import { FlightSegment } from "../FlightSegment";
import { getPosition } from "./getPosition";

export const getFlightSegments = (
  flight: ProcessedFlightSearchResult,
  tripStartAirport: string,
  tripEndAirport: string,
  increment: number,
  startHourOffset: number,
  intervalCount: number,
  containerWidth: number,
): FlightSegment[] => {
  const layoversWithStops = flight.layovers;
  if (layoversWithStops.length === 0) {
    layoversWithStops.push({
      fromTime: flight.fromTime,
      fromLocalTime: flight.fromLocalTime,
      toTime: flight.toTime,
      toLocalTime: flight.toLocalTime,
      from: tripStartAirport,
      to: tripEndAirport,
      isLayoverStop: false,
      operatingAirline: flight.operatingAirline,
      duration: flight.duration,
      timezoneOffset: flight.timezoneOffset,
    });
  }

  let startDayOffset = 0;
  let endDayOffset = 0;

  let previousLayover: FlightSegment;
  return layoversWithStops.map((layover) => {
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
    let { width, startX } = getPosition({
      fromTime: layover.fromTime,
      toTime: layover.toTime,
      startDayOffset,
      endDayOffset,
      increment,
      startHourOffset,
      intervalCount,
      containerWidth,
    });

    if (layover.isLayoverStop) {
      width += 1;
    }
    if (previousLayover) {
      startX = previousLayover.layout.startPosition + previousLayover.layout.width;
    }

    const flightSegment = new FlightSegment({ ...layover, layout: { width: width, startPosition: startX } });
    previousLayover = flightSegment;
    return flightSegment;
  });
};
