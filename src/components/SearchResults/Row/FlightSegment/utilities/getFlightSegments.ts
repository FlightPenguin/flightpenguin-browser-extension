import AirlineMap from "../../../../../shared/nameMaps/airlineMap";
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
          operatingAirline: flight.operatingAirline,
        };
  layoversWithStops.push({
    fromTime: lastFlight.fromTime,
    toTime: lastFlight.toTime,
    from: lastFlight.from,
    to: lastFlight.to,
    isLayoverStop: false,
    operatingAirline: flight.operatingAirline,
  });

  let startDayOffset = 0;
  let endDayOffset = 0;

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
    return new FlightSegment({ ...layover, layout: { width: width, startPosition: startX } });
  });
};
