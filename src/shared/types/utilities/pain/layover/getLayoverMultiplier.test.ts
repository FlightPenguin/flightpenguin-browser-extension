import { LayoverFactory } from "../../../factories/Layover";
import { getLayoverMultiplier } from "./getLayoverMultiplier";
import * as getLongDurationMultiplierModule from "./getLongDurationMultiplier";
import * as getOvernightMultiplierModule from "./getOvernightMultiplier";
import * as getShortDurationMultiplierModule from "./getShortDurationMultiplier";
import * as getTransferMultiplierModule from "./getTransferMultiplier";

describe("getLayoverMultiplier happy path", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("works with no additional hits", () => {
    const longDurSpy = jest.spyOn(getLongDurationMultiplierModule, "getLongDurationMultiplier");
    longDurSpy.mockReturnValue(0);
    const overnightSpy = jest.spyOn(getOvernightMultiplierModule, "getOvernightMultiplier");
    overnightSpy.mockReturnValue(0);
    const shortDurSpy = jest.spyOn(getShortDurationMultiplierModule, "getShortDurationMultiplier");
    shortDurSpy.mockReturnValue(0);
    const transferSpy = jest.spyOn(getTransferMultiplierModule, "getTransferMultiplier");
    transferSpy.mockReturnValue(0);

    const layover = LayoverFactory.build();
    expect(getLayoverMultiplier(layover)).toEqual(2);
  });

  it("works with all (which implicitly means no long tax)", () => {
    const longDurSpy = jest.spyOn(getLongDurationMultiplierModule, "getLongDurationMultiplier");
    longDurSpy.mockReturnValue(1);
    const overnightSpy = jest.spyOn(getOvernightMultiplierModule, "getOvernightMultiplier");
    overnightSpy.mockReturnValue(2);
    const shortDurSpy = jest.spyOn(getShortDurationMultiplierModule, "getShortDurationMultiplier");
    shortDurSpy.mockReturnValue(3);
    const transferSpy = jest.spyOn(getTransferMultiplierModule, "getTransferMultiplier");
    transferSpy.mockReturnValue(4);

    const layover = LayoverFactory.build();
    expect(getLayoverMultiplier(layover)).toEqual(11);
  });

  it("works with all except short tax", () => {
    const longDurSpy = jest.spyOn(getLongDurationMultiplierModule, "getLongDurationMultiplier");
    longDurSpy.mockReturnValue(1);
    const overnightSpy = jest.spyOn(getOvernightMultiplierModule, "getOvernightMultiplier");
    overnightSpy.mockReturnValue(2);
    const shortDurSpy = jest.spyOn(getShortDurationMultiplierModule, "getShortDurationMultiplier");
    shortDurSpy.mockReturnValue(0);
    const transferSpy = jest.spyOn(getTransferMultiplierModule, "getTransferMultiplier");
    transferSpy.mockReturnValue(4);

    const layover = LayoverFactory.build();
    expect(getLayoverMultiplier(layover)).toEqual(9);
  });
});
