import { addMinutes } from "date-fns";

import { isLong } from "./isLong";

describe("isLong happy path", () => {
  describe("not overnight", () => {
    it("not long", () => {
      const from = new Date();
      const to = addMinutes(from, 180);

      const value = isLong(from, to, false);
      expect(value).toEqual(false);
    });

    it("long", () => {
      const from = new Date();
      const to = addMinutes(from, 181);

      const value = isLong(from, to, false);
      expect(value).toEqual(true);
    });
  });

  describe("is overnight", () => {
    it("not long", () => {
      const from = new Date();
      const to = addMinutes(from, 600);

      const value = isLong(from, to, true);
      expect(value).toEqual(false);
    });

    it("long", () => {
      const from = new Date();
      const to = addMinutes(from, 601);

      const value = isLong(from, to, true);
      expect(value).toEqual(true);
    });
  });
});
