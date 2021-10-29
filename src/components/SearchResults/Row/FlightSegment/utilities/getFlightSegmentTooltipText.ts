import { FlightSegment } from "../FlightSegment";

export const getFlightSegmentTooltipText = (flightSegment: FlightSegment): string => {
  let text;
  if (flightSegment.isLayoverStop) {
    text = `Layover in ${flightSegment.from}`;
    text += "\n";
    text += `Begins at ${flightSegment.fromLocalTime} local time`;
    text += "\n";
    text += `Ends at ${flightSegment.toLocalTime} local time`;
    text += "\n";
    text += `Layover duration of ${flightSegment.duration}`;
  } else {
    text = `${flightSegment.operatingAirline.display}`;
    text += "\n";
    text += `Departs from ${flightSegment.from} at ${flightSegment.fromLocalTime} local time`;
    text += "\n";
    text += `Arrives at ${flightSegment.to} at ${flightSegment.toLocalTime} local time`;
    text += "\n";
    text += `Flight duration of ${flightSegment.duration}`;
  }
  return text;
};
