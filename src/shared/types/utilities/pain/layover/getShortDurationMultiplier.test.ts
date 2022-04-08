import { LayoverFactory } from "../../../factories/Layover";
import { getShortDurationMultiplier } from "./getShortDurationMultiplier";

describe("getShortDurationMultiplier happy path", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns correct value for not short duration", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 76);
    expect(getShortDurationMultiplier(layover)).toEqual(0);
  });

  it("returns correct value for extremely short transfer", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 29);
    expect(getShortDurationMultiplier(layover)).toEqual(5);
  });

  it("returns correct value for  short transfer", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 59);
    expect(getShortDurationMultiplier(layover)).toEqual(1);
  });

  it("returns correct value for rushed but reasonable transfer", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 74);
    expect(getShortDurationMultiplier(layover)).toEqual(0.25);
  });
});
