import { getFlightRowComponentsWidth, getLegendWidth } from "./getFlightRowComponentsWidth";

describe("getFlightRowComponentsWidth happy path", () => {
  it("works", () => {
    const value = getFlightRowComponentsWidth({ resultsContainerWidth: 1500 });
    expect(value).toEqual({ legendContainerWidth: 300, flightSegmentsContainerWidth: 1199 });
  });
});

describe("getLegendWidth size", () => {
  it("Never goes wider than 300px", () => {
    const value = getLegendWidth(1501);
    expect(value).toEqual(300);
  });

  it("Never goes smaller than 72px", () => {
    const value = getLegendWidth(359);
    expect(value).toEqual(72);
  });

  it("Uses 20% of the container", () => {
    const value = getLegendWidth(1000);
    expect(value).toEqual(200);
  });

  it("Gives a floor value", () => {
    const value = getLegendWidth(866);
    expect(value).toEqual(173);
  });
});
