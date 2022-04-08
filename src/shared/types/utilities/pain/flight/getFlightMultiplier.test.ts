import { FlightFactory } from "../../../factories/Flight";
import * as getAwfulCarrierMultiplierModule from "./getAwfulCarrierMultiplier";
import { getFlightMultiplier } from "./getFlightMultiplier";

describe("getFlightMultiplier with awful carrier", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("adds the result", () => {
    const spy = jest.spyOn(getAwfulCarrierMultiplierModule, "getAwfulCarrierMultiplier");
    spy.mockReturnValue(0.5);

    const flight = FlightFactory.build();
    expect(getFlightMultiplier(flight)).toEqual(1.5);
  });
});
