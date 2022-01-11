import { isLayoverCountInRange } from "./isLayoverCountInRange";

describe("isLayoverCountInRange happy path", () => {
  it("carriers undefined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: {}, maxLayoverCount: undefined });
    expect(value).toEqual(true);
  });

  it("equality", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: { layoverCount: 0 }, maxLayoverCount: 0 });
    expect(value).toEqual(true);
  });

  it("too many layovers", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: { layoverCount: 2 }, maxLayoverCount: 1 });
    expect(value).toEqual(false);
  });
  //
  it("less than", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: { layoverCount: 0 }, maxLayoverCount: 2 });
    expect(value).toEqual(true);
  });
});
