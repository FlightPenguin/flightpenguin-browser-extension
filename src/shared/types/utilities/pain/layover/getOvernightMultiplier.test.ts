import { differenceInCalendarDays } from "date-fns";

import { LayoverFactory } from "../../../factories/Layover";
import { getOvernightMultiplier } from "./getOvernightMultiplier";

jest.mock("date-fns", () => {
  const original = jest.requireActual("date-fns");
  return {
    ...original,
    differenceInCalendarDays: jest.fn(),
  };
});

describe("getOvernightMultiplier happy path", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("same day", () => {
    (differenceInCalendarDays as jest.Mock).mockImplementation(() => 0);
    const layover = LayoverFactory.build();
    expect(getOvernightMultiplier(layover)).toEqual(0);
  });

  it("more than 0 days", () => {
    (differenceInCalendarDays as jest.Mock).mockImplementation(() => 1);
    const layover = LayoverFactory.build();
    expect(getOvernightMultiplier(layover)).toEqual(0.15);
  });

  it("less than zero days", () => {
    (differenceInCalendarDays as jest.Mock).mockImplementation(() => -1);
    const layover = LayoverFactory.build();
    expect(getOvernightMultiplier(layover)).toEqual(0.15);
  });
});
