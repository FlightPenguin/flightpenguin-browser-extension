import { TripComponentFactory } from "./factories/TripComponent";

describe("happy path", () => {
  it("getType works", () => {
    const tc = TripComponentFactory.build({}, { transient: { type: "FLIGHT" } });
    expect(tc.getType()).toEqual("FLIGHT");
  });

  it("getObject works", () => {
    const tc = TripComponentFactory.build({}, { transient: { type: "FLIGHT" } });
    expect(tc.getObject()).toBeDefined();
  });
});
