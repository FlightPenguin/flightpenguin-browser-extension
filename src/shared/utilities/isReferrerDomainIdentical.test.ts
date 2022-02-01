import { isReferrerDomainIdentical } from "./isReferrerDomainIdentical";

describe("isReferrerDomainIdentical happy path", () => {
  beforeEach(() => {
    Reflect.deleteProperty(window, "location");
    Object.defineProperty(window, "location", {
      value: {
        hostname: "www.example.net",
      },
      writable: true,
    });

    Reflect.deleteProperty(window, "document");
    Object.defineProperty(window, "document", {
      value: {
        referrer: "",
      },
      writable: true,
    });
  });

  it("no referrer", () => {
    const value = isReferrerDomainIdentical();
    expect(value).toEqual(false);
  });

  it("referrer with exact same domain", () => {
    Object.defineProperty(window.document, "referrer", { value: "https://www.example.net" });
    const value = isReferrerDomainIdentical();
    expect(value).toEqual(true);
  });

  it("referrer with different domain", () => {
    Object.defineProperty(window.document, "referrer", { value: "https://www.example.com" });
    const value = isReferrerDomainIdentical();
    expect(value).toEqual(false);
  });

  it("referrer with different subdomain, same parent", () => {
    Object.defineProperty(window.document, "referrer", { value: "https://app.example.net" });
    const value = isReferrerDomainIdentical();
    expect(value).toEqual(true);
  });

  it.todo("parsedCurrentDomain returns error");
  it.todo("parsedReferrerDomain returns error");
});
