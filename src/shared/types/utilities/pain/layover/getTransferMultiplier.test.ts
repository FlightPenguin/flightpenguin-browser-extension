import { LayoverFactory } from "../../../factories/Layover";
import { getTransferMultiplier } from "./getTransferMultiplier";

describe("getTransferMultiplier happy path", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns correct value for no transfer", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "isTransfer").mockImplementation(() => false);
    expect(getTransferMultiplier(layover)).toEqual(0);
  });

  it("returns correct value for  transfer", () => {
    const layover = LayoverFactory.build();
    jest.spyOn(layover, "isTransfer").mockImplementation(() => true);
    expect(getTransferMultiplier(layover)).toEqual(10);
  });
});
