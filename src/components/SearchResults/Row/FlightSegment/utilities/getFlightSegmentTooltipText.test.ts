import { FlightSegment } from "../FlightSegment";
import { getFlightSegmentTooltipText } from "./getFlightSegmentTooltipText";

describe("getFlightSegmentTooltipText happy path", () => {
  it("not layover", () => {
    const value = getFlightSegmentTooltipText(
      new FlightSegment({
        fromTime: "3:25 am",
        fromLocalTime: "2:25 am",
        toTime: "5:26 am",
        toLocalTime: "6:26 am",
        duration: "2h 1m",
        from: "SFO",
        to: "DEN",
        isLayoverStop: false,
        operatingAirline: {
          display: "Southwest",
          color: "#MEOW",
        },
        layout: { width: 14, startPosition: 12 },
      }),
    );
    expect(value).toEqual(`Southwest
Departs from SFO at 2:25 am local time
Arrives at DEN at 6:26 am local time
Flight duration of 2h 1m`);
  });

  it("layover", () => {
    const value = getFlightSegmentTooltipText(
      new FlightSegment({
        fromTime: "3:25 am",
        fromLocalTime: "2:25 am",
        toTime: "5:26 am",
        toLocalTime: "6:26 am",
        duration: "2h 1m",
        from: "SFO",
        to: "DEN",
        isLayoverStop: true,
        operatingAirline: {
          display: "Layover in SFO",
          color: "#MEOW",
        },
        layout: { width: 14, startPosition: 12 },
      }),
    );
    expect(value).toEqual(`Layover in SFO
Begins at 2:25 am local time
Ends at 6:26 am local time
Layover duration of 2h 1m`);
  });
});
