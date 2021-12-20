import { getModalStorageKey } from "./getModalStorageKey";

describe("getModalStorageKey happy path", () => {
  it("works", () => {
    const value = getModalStorageKey("abcd1234", "DEPARTURE");
    expect(value).toEqual("fp-flight-modal-departure-abcd1234");
  });
});

describe("getModalStorageKey error path", () => {
  it("requires valid flightId", () => {
    expect(() => {
      getModalStorageKey("", "DEPARTURE");
    }).toThrow("Invalid input for getModalStorageKey");
  });

  it("requires valid flight type", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getModalStorageKey("", "WEIRD INPUT");
    }).toThrow("Invalid input for getModalStorageKey");
  });
});
