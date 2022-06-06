import { isFirefoxExtension } from "./isFirefoxExtension";

describe("isFirefoxExtension happy path", () => {
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
    const value = isFirefoxExtension();
    expect(value).toEqual(true);
  });

  it("works with chrome extension protocol", () => {
    Object.defineProperty(window, "location", {
      value: {
        protocol: "chrome-extension:",
      },
      writable: true,
    });
    const value = isFirefoxExtension();
    expect(value).toEqual(false);
  });
});
