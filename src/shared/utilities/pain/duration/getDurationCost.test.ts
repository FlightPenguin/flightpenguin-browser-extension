import { getDurationCost } from "./getDurationCost";

describe("getDurationCost integration tests", () => {
  describe("multiplier: 1", () => {
    describe("duration: 92 mins", () => {
      it("economy", () => {
        const value = getDurationCost("1h 30m", "econ", 1);
        expect(value).toBe(22.5);
      });

      it("premium economy", () => {
        const value = getDurationCost("1h 30m", "prem_econ", 1);
        expect(value).toBe(22.5);
      });

      it("business", () => {
        const value = getDurationCost("1h 30m", "business", 1);
        expect(value).toBe(45);
      });

      it("first", () => {
        const value = getDurationCost("1h 30m", "first", 1);
        expect(value).toBe(112.5);
      });
    });

    describe("duration: 307 mins", () => {
      it("economy", () => {
        const value = getDurationCost("5h 7m", "econ", 1);
        expect(value).toBe(75);
      });

      it("premium economy", () => {
        const value = getDurationCost("5h 7m", "prem_econ", 1);
        expect(value).toBe(75);
      });

      it("business economy", () => {
        const value = getDurationCost("5h 7m", "business", 1);
        expect(value).toBe(150);
      });

      it("first", () => {
        const value = getDurationCost("5h 7m", "first", 1);
        expect(value).toBe(375);
      });
    });

    describe("duration: 500 mins", () => {
      it("economy", () => {
        const value = getDurationCost("8h 20m", "econ", 1);
        expect(value).toBe(120);
      });

      it("premium economy", () => {
        const value = getDurationCost("8h 20m", "prem_econ", 1);
        expect(value).toBe(120);
      });

      it("business economy", () => {
        const value = getDurationCost("8h 20m", "business", 1);
        expect(value).toBe(240);
      });

      it("first", () => {
        const value = getDurationCost("8h 20m", "first", 1);
        expect(value).toBe(600);
      });
    });
  });

  describe("multiplier: 2", () => {
    describe("duration: 92 mins", () => {
      it("economy", () => {
        const value = getDurationCost("1h 30m", "econ", 2);
        expect(value).toBe(45);
      });

      it("premium economy", () => {
        const value = getDurationCost("1h 30m", "prem_econ", 2);
        expect(value).toBe(45);
      });

      it("business", () => {
        const value = getDurationCost("1h 30m", "business", 2);
        expect(value).toBe(90);
      });

      it("first", () => {
        const value = getDurationCost("1h 30m", "first", 2);
        expect(value).toBe(225);
      });
    });

    describe("duration: 307 mins", () => {
      it("economy", () => {
        const value = getDurationCost("5h 7m", "econ", 2);
        expect(value).toBe(150);
      });

      it("premium economy", () => {
        const value = getDurationCost("5h 7m", "prem_econ", 2);
        expect(value).toBe(150);
      });

      it("business economy", () => {
        const value = getDurationCost("5h 7m", "business", 2);
        expect(value).toBe(300);
      });

      it("first", () => {
        const value = getDurationCost("5h 7m", "first", 2);
        expect(value).toBe(750);
      });
    });

    describe("duration: 500 mins", () => {
      it("economy", () => {
        const value = getDurationCost("8h 20m", "econ", 2);
        expect(value).toBe(240);
      });

      it("premium economy", () => {
        const value = getDurationCost("8h 20m", "prem_econ", 2);
        expect(value).toBe(240);
      });

      it("business economy", () => {
        const value = getDurationCost("8h 20m", "business", 2);
        expect(value).toBe(480);
      });

      it("first", () => {
        const value = getDurationCost("8h 20m", "first", 2);
        expect(value).toBe(1200);
      });
    });
  });

  describe("multiplier: .25", () => {
    describe("duration: 92 mins", () => {
      it("economy", () => {
        const value = getDurationCost("1h 30m", "econ", 1);
        expect(value).toBe(22.5);
      });

      it("premium economy", () => {
        const value = getDurationCost("1h 30m", "prem_econ", 1);
        expect(value).toBe(22.5);
      });

      it("business", () => {
        const value = getDurationCost("1h 30m", "business", 1);
        expect(value).toBe(45);
      });

      it("first", () => {
        const value = getDurationCost("1h 30m", "first", 1);
        expect(value).toBe(112.5);
      });
    });

    describe("duration: 307 mins", () => {
      it("economy", () => {
        const value = getDurationCost("5h 7m", "econ", 0.25);
        expect(value).toBe(18.75);
      });

      it("premium economy", () => {
        const value = getDurationCost("5h 7m", "prem_econ", 0.25);
        expect(value).toBe(18.75);
      });

      it("business economy", () => {
        const value = getDurationCost("5h 7m", "business", 0.25);
        expect(value).toBe(37.5);
      });

      it("first", () => {
        const value = getDurationCost("5h 7m", "first", 0.25);
        expect(value).toBe(93.75);
      });
    });

    describe("duration: 500 mins", () => {
      it("economy", () => {
        const value = getDurationCost("8h 20m", "econ", 0.25);
        expect(value).toBe(30);
      });

      it("premium economy", () => {
        const value = getDurationCost("8h 20m", "prem_econ", 0.25);
        expect(value).toBe(30);
      });

      it("business economy", () => {
        const value = getDurationCost("8h 20m", "business", 0.25);
        expect(value).toBe(60);
      });

      it("first", () => {
        const value = getDurationCost("8h 20m", "first", 0.25);
        expect(value).toBe(150);
      });
    });
  });
});
