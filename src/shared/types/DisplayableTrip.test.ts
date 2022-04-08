import { CabinType } from "../../background/constants";
import { DisplayableTripFactory } from "./factories/DisplayableTrip";

const tripInput = { cabin: "econ" as CabinType, lowestFare: 100, tripInput: undefined };

describe("DisplayableTrip happy path", () => {
  it("getTrip works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getTrip()).toBeDefined();
  });

  it("getLowestFare works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getLowestFare()).toEqual(100);
  });

  it("getPain works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getPain()).toBeDefined();
    expect(trip.getPain()).toBeGreaterThan(0);
  });

  it("getCalculatedPain works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getCalculatedPain()).toBeDefined();
    expect(trip.getCalculatedPain()).toBeGreaterThan(0);
  });

  // TODO: Constructor tests
});
