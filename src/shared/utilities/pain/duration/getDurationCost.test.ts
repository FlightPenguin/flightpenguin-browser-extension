import { getDurationCost } from "./getDurationCost";

describe("getDurationCost integration tests", () => {
  describe("multiplier: 1", () => {
    describe("duration: 92 mins", () => {
      it("economy", () => {
        const value = getDurationCost("1h 30m", "econ", 1);
        expect(value).toBe(37.5);
      });

      it("premium economy", () => {
        const value = getDurationCost("1h 30m", "prem_econ", 1);
        expect(value).toBe(37.5);
      });

      it("business", () => {
        const value = getDurationCost("1h 30m", "business", 1);
        expect(value).toBe(75);
      });

      it("first", () => {
        const value = getDurationCost("1h 30m", "first", 1);
        expect(value).toBe(187.5);
      });
    });

    describe("duration: 307 mins", () => {
      it("economy", () => {
        const value = getDurationCost("5h 7m", "econ", 1);
        expect(value).toBe(125);
      });

      it("premium economy", () => {
        const value = getDurationCost("5h 7m", "prem_econ", 1);
        expect(value).toBe(125);
      });

      it("business economy", () => {
        const value = getDurationCost("5h 7m", "business", 1);
        expect(value).toBe(250);
      });

      it("first", () => {
        const value = getDurationCost("5h 7m", "first", 1);
        expect(value).toBe(625);
      });
    });

    describe("duration: 500 mins", () => {
      it("economy", () => {
        const value = getDurationCost("8h 20m", "econ", 1);
        expect(value).toBe(200);
      });

      it("premium economy", () => {
        const value = getDurationCost("8h 20m", "prem_econ", 1);
        expect(value).toBe(200);
      });

      it("business economy", () => {
        const value = getDurationCost("8h 20m", "business", 1);
        expect(value).toBe(400);
      });

      it("first", () => {
        const value = getDurationCost("8h 20m", "first", 1);
        expect(value).toBe(1000);
      });
    });
  });

  describe("multiplier: 2", () => {
    describe("duration: 92 mins", () => {
      it("economy", () => {
        const value = getDurationCost("1h 30m", "econ", 2);
        expect(value).toBe(75);
      });

      it("premium economy", () => {
        const value = getDurationCost("1h 30m", "prem_econ", 2);
        expect(value).toBe(75);
      });

      it("business", () => {
        const value = getDurationCost("1h 30m", "business", 2);
        expect(value).toBe(150);
      });

      it("first", () => {
        const value = getDurationCost("1h 30m", "first", 2);
        expect(value).toBe(375);
      });
    });

    describe("duration: 307 mins", () => {
      it("economy", () => {
        const value = getDurationCost("5h 7m", "econ", 2);
        expect(value).toBe(250);
      });

      it("premium economy", () => {
        const value = getDurationCost("5h 7m", "prem_econ", 2);
        expect(value).toBe(250);
      });

      it("business economy", () => {
        const value = getDurationCost("5h 7m", "business", 2);
        expect(value).toBe(500);
      });

      it("first", () => {
        const value = getDurationCost("5h 7m", "first", 2);
        expect(value).toBe(1250);
      });
    });

    describe("duration: 500 mins", () => {
      it("economy", () => {
        const value = getDurationCost("8h 20m", "econ", 2);
        expect(value).toBe(400);
      });

      it("premium economy", () => {
        const value = getDurationCost("8h 20m", "prem_econ", 2);
        expect(value).toBe(400);
      });

      it("business economy", () => {
        const value = getDurationCost("8h 20m", "business", 2);
        expect(value).toBe(800);
      });

      it("first", () => {
        const value = getDurationCost("8h 20m", "first", 2);
        expect(value).toBe(2000);
      });
    });
  });

  describe("multiplier: .25", () => {
    describe("duration: 92 mins", () => {
      it("economy", () => {
        const value = getDurationCost("1h 30m", "econ", 1);
        expect(value).toBe(37.5);
      });

      it("premium economy", () => {
        const value = getDurationCost("1h 30m", "prem_econ", 1);
        expect(value).toBe(37.5);
      });

      it("business", () => {
        const value = getDurationCost("1h 30m", "business", 1);
        expect(value).toBe(75);
      });

      it("first", () => {
        const value = getDurationCost("1h 30m", "first", 1);
        expect(value).toBe(187.5);
      });
    });

    describe("duration: 307 mins", () => {
      it("economy", () => {
        const value = getDurationCost("5h 7m", "econ", 0.25);
        expect(value).toBe(31.25);
      });

      it("premium economy", () => {
        const value = getDurationCost("5h 7m", "prem_econ", 0.25);
        expect(value).toBe(31.25);
      });

      it("business economy", () => {
        const value = getDurationCost("5h 7m", "business", 0.25);
        expect(value).toBe(62.5);
      });

      it("first", () => {
        const value = getDurationCost("5h 7m", "first", 0.25);
        expect(value).toBe(156.25);
      });
    });

    describe("duration: 500 mins", () => {
      it("economy", () => {
        const value = getDurationCost("8h 20m", "econ", 0.25);
        expect(value).toBe(50);
      });

      it("premium economy", () => {
        const value = getDurationCost("8h 20m", "prem_econ", 0.25);
        expect(value).toBe(50);
      });

      it("business economy", () => {
        const value = getDurationCost("8h 20m", "business", 0.25);
        expect(value).toBe(100);
      });

      it("first", () => {
        const value = getDurationCost("8h 20m", "first", 0.25);
        expect(value).toBe(250);
      });
    });
  });
});
