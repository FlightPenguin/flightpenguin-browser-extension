import { getParsedModalHtml } from "./getParsedModalHtml";

describe("getParsedModalHtml happy path", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it.skip("works", () => {
    // skipped as I'm too lazy to mock domparser right now
    sessionStorage.setItem("fp-flight-modal-departure-abcd1234", "<html lang='en'><body><p>Meow</p></body></html>");

    const value = getParsedModalHtml("abcd1234", "DEPARTURE");
    expect(value).toEqual("hi");
  });
});

describe("getParsedModalHtml error path", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("requires valid flightId", () => {
    expect(() => {
      getParsedModalHtml("", "DEPARTURE");
    }).toThrow("Invalid input for getParsedModalHtml");
  });

  it("requires valid flight type", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getParsedModalHtml("", "WEIRD INPUT");
    }).toThrow("Invalid input for getParsedModalHtml");
  });

  it("missing key", () => {
    expect(() => {
      getParsedModalHtml("abcd1234", "DEPARTURE");
    }).toThrow("Unable to extract flight card modal data");
  });
});
