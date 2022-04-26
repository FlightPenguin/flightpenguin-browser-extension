import { getParsedISODate } from "./getParsedISODate";
import { getPercentagePerMinute, getTimebarPositions } from "./getTimebarPositions";

describe("getPercentagePerMinute happy path", () => {
  it("works with elapsedTime provided", () => {
    const startTime = getParsedISODate("2022-04-07T06:00:00.000Z");
    const endTime = getParsedISODate("2022-04-07T13:00:00.000Z");
    const elapsedTime = 420;
    const value = getPercentagePerMinute({ startTime, endTime, elapsedTime });
    expect(value.toNumber()).toBeCloseTo(0.2381);
  });

  it("works with elapsedTime provided but zero", () => {
    const startTime = getParsedISODate("2022-04-07T06:00:00.000Z");
    const endTime = getParsedISODate("2022-04-07T13:00:00.000Z");
    const elapsedTime = 0;
    const value = getPercentagePerMinute({ startTime, endTime, elapsedTime });
    expect(value.toNumber()).toBeCloseTo(0.2381);
  });

  it("works with elapsedTime not provided", () => {
    const startTime = getParsedISODate("2022-04-07T06:00:00.000Z");
    const endTime = getParsedISODate("2022-04-07T13:00:00.000Z");
    const value = getPercentagePerMinute({ startTime, endTime });
    expect(value.toNumber()).toBeCloseTo(0.2381);
  });
});

describe("getTimebarPositions happy path", () => {
  it("works without container elapsed time", () => {
    const flightStartTime = getParsedISODate("2022-04-07T06:00:00.000Z");
    const flightEndTime = getParsedISODate("2022-04-07T13:00:00.000Z");
    const containerStartTime = getParsedISODate("2022-04-07T01:00:00.000Z");
    const containerEndTime = getParsedISODate("2022-04-07T23:00:00.000Z");
    const value = getTimebarPositions({
      containerStartTime,
      containerEndTime,
      timebarStartTime: flightStartTime,
      timebarEndTime: flightEndTime,
    });
    expect(value).toEqual({
      startX: 22.73,
      width: 31.82,
    });
  });

  it("works with container elapsed time", () => {
    const flightStartTime = getParsedISODate("2022-04-07T06:00:00.000Z");
    const flightEndTime = getParsedISODate("2022-04-07T13:00:00.000Z");
    const containerStartTime = getParsedISODate("2022-04-07T01:00:00.000Z");
    const containerEndTime = getParsedISODate("2022-04-07T23:00:00.000Z");
    const containerElapsedTime = 1320;
    const value = getTimebarPositions({
      containerStartTime,
      containerEndTime,
      containerElapsedTime,
      timebarStartTime: flightStartTime,
      timebarEndTime: flightEndTime,
    });
    expect(value).toEqual({
      startX: 22.73,
      width: 31.82,
    });
  });
});
