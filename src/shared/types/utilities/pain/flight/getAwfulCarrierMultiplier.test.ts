import { FlightFactory } from "../../../factories/Flight";
import { getAwfulCarrierMultiplier } from "./getAwfulCarrierMultiplier";

describe("getAwfulCarriers happy path", () => {
  it("provides expected result with an awful carrier", () => {
    const flight = FlightFactory.build({}, { transient: { marketingAirline: { name: "Spirit Airlines" } } });
    expect(getAwfulCarrierMultiplier(flight)).toEqual(0.9);
  });

  it("provides expected result with a not awful carrier", () => {
    const flight = FlightFactory.build({}, { transient: { marketingAirline: { name: "United" } } });
    expect(getAwfulCarrierMultiplier(flight)).toEqual(0);
  });
});
