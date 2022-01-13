import { isFlightOperatedByCarriers } from "./isFlightOperatedByCarriers";

describe("isFlightOperatedByCarriers happy path", () => {
  it("carriers undefined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isFlightOperatedByCarriers({ flight: {}, carriers: undefined });
    expect(value).toEqual(true);
  });

  it("carriers empty", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isFlightOperatedByCarriers({ flight: {}, carriers: [] });
    expect(value).toEqual(true);
  });

  it("does not have carrier", () => {
    const value = isFlightOperatedByCarriers({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flight: { carriers: ["United", "Finn Air"] },
      carriers: ["American"],
    });
    expect(value).toEqual(false);
  });
  //
  it("has some carriers", () => {
    const value = isFlightOperatedByCarriers({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flight: { carriers: ["United", "Continental"] },
      carriers: ["United", "Finn Air", "American"],
    });
    expect(value).toEqual(false);
  });

  it("has all carriers", () => {
    const value = isFlightOperatedByCarriers({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flight: { carriers: ["United"] },
      carriers: ["United", "Finn Air"],
    });
    expect(value).toEqual(true);
  });
});
