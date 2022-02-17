import { getArrivalAirport } from "./getArrivalAirport";

describe("getArrivalAirport happy path", () => {
  it("has no layovers", () => {
    const flight = { layovers: [] };
    const formData = { to: { value: "MEOW" } };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = getArrivalAirport({ flight, formData });
    expect(value).toEqual("MEOW");
  });

  it("has layovers", () => {
    const flight = { layovers: [{ to: "hiss" }, { to: "moo" }, { to: "neigh" }] };
    const formData = { to: { value: "MEOW" } };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = getArrivalAirport({ flight, formData });
    expect(value).toEqual("NEIGH");
  });
});
