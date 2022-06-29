import { TripSourceFactory } from "./factories/TripSource";

const tripSourceInput = { fare: 100, id: "meow", name: "expedia" };

describe("trip source happy path", () => {
  it("getDisplayName works", () => {
    const source = TripSourceFactory.build({}, { transient: { ...tripSourceInput, displayNames: ["cat"] } });
    expect(source.getDisplayName()).toEqual("cat");
  });

  it("getDisplayName multiple works", () => {
    const source = TripSourceFactory.build(
      {},
      { transient: { ...tripSourceInput, displayNames: ["cat", "dog", "squirrel"] } },
    );
    expect(source.getDisplayName()).toEqual("cat, dog, and squirrel");
  });

  it("getDisplayNames works", () => {
    const source = TripSourceFactory.build({}, { transient: { ...tripSourceInput, displayNames: ["cat"] } });
    expect(source.getDisplayNames()).toEqual(["cat"]);
  });

  it("getFare works with number", () => {
    const source = TripSourceFactory.build({}, { transient: tripSourceInput });
    expect(source.getFare()).toEqual(100);
  });

  it("getFare works with string", () => {
    const source = TripSourceFactory.build({}, { transient: { ...tripSourceInput, fare: "100" } });
    expect(source.getFare()).toEqual(100);
  });

  it("getId works", () => {
    const source = TripSourceFactory.build({}, { transient: { ...tripSourceInput, fare: "100" } });
    expect(source.getId()).toEqual("meow");
  });

  it("getName works", () => {
    const source = TripSourceFactory.build({}, { transient: { ...tripSourceInput, fare: "100" } });
    expect(source.getName()).toEqual("expedia");
  });

  it("getIsFirstParty", () => {
    const source = TripSourceFactory.build({}, { transient: { ...tripSourceInput, fare: "100" } });
    expect(source.getIsFirstParty()).toBeFalsy();
  });
});
