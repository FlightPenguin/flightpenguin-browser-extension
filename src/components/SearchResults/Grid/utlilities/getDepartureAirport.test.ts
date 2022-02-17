import { getDepartureAirport } from "./getDepartureAirport";

describe("getDepartureAirport happy path", () => {
  it("has no layovers", () => {
    const flight = { layovers: [] };
    const formData = { from: { value: "MEOW" } };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = getDepartureAirport({ flight, formData });
    expect(value).toEqual("MEOW");
  });

  it("has layovers", () => {
    const flight = { layovers: [{ from: "hiss" }, { from: "moo" }, { from: "neigh" }] };
    const formData = { from: { value: "MEOW" } };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = getDepartureAirport({ flight, formData });
    expect(value).toEqual("HISS");
  });
});
