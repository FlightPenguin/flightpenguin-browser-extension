import { isLayoverCountInRange } from "./isLayoverCountInRange";

describe("isLayoverCountInRange happy path", () => {
  it("layover count undefined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: {}, layoverCount: undefined });
    expect(value).toEqual(true);
  });

  it("in selection", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: { layoverCount: 2 }, layoverCount: [0, 2] });
    expect(value).toEqual(true);
  });
  //
  it("not in selection", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isLayoverCountInRange({ flight: { layoverCount: 2 }, layoverCount: [0] });
    expect(value).toEqual(false);
  });
});
