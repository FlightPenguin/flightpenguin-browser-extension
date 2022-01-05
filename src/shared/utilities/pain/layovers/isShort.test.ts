import { addMinutes } from "date-fns";

import { isShort } from "./isShort";

describe("isShort happy path", () => {
  it("not short", () => {
    const from = new Date();
    const to = addMinutes(from, 60);

    const value = isShort(from, to);
    expect(value).toEqual(false);
  });

  it("short", () => {
    const from = new Date();
    const to = addMinutes(from, 59);

    const value = isShort(from, to);
    expect(value).toEqual(true);
  });
});
