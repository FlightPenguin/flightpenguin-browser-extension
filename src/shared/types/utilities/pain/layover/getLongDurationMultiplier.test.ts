import { LayoverFactory } from "../../../factories/Layover";
import { getLongDurationMultiplier } from "./getLongDurationMultiplier";

describe("getLongDurationMultiplier happy path", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns correct value for overnight and short", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 600);
    expect(getLongDurationMultiplier(layover, true)).toEqual(0);
  });
  it("returns correct value for overnight and long", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 601);
    expect(getLongDurationMultiplier(layover, true)).toEqual(1);
  });
  it("returns correct value for not overnight and short", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 180);
    expect(getLongDurationMultiplier(layover, false)).toEqual(0);
  });
  it("returns correct value for not overnight and long", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "getDurationMinutes").mockImplementation(() => 181);
    expect(getLongDurationMultiplier(layover, false)).toEqual(1);
  });
});
