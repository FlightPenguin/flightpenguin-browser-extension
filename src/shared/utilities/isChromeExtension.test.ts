import { isChromeExtension } from "./isChromeExtension";

describe("isChromeExtension happy path", () => {
  beforeEach(() => {
    Reflect.deleteProperty(window, "location");
  });

  it("works with firefox extension protocol", () => {
    Object.defineProperty(window, "location", {
      value: {
        protocol: "moz-extension:",
      },
      writable: true,
    });
    const value = isChromeExtension();
    expect(value).toEqual(false);
  });

  it("works with chrome extension protocol", () => {
    Object.defineProperty(window, "location", {
      value: {
        protocol: "chrome-extension:",
      },
      writable: true,
    });
    const value = isChromeExtension();
    expect(value).toEqual(true);
  });
});
