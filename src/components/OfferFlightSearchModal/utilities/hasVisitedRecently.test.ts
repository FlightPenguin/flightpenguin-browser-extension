import { hasVisitedRecently } from "./hasVisitedRecently";

describe("happy path", () => {
  beforeEach(() => {
    sessionStorage.clear();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = { hostname: "www.example.net" };
  });

  it("has no recent visits, period", async () => {
    const value = hasVisitedRecently();
    expect(value).toBe(false);
  });

  it("has a recent visits, period", async () => {
    const now = new Date().getTime() - 100;
    const key = `fp-visit-tracker-www.example.net`;
    sessionStorage.setItem(key, JSON.stringify(now));

    const value = hasVisitedRecently();
    expect(value).toBe(true);

    const storedValue = Number(JSON.parse(sessionStorage.getItem(key) || "0"));
    expect(storedValue).toEqual(now);
  });

  it("has an old visit", async () => {
    const now = new Date().getTime();
    const key = `fp-visit-tracker-www.example.net`;
    sessionStorage.setItem(key, JSON.stringify(0));

    const value = hasVisitedRecently();
    expect(value).toBe(false);

    const storedValue = Number(JSON.parse(sessionStorage.getItem(key) || "0"));
    expect(storedValue).toBeGreaterThanOrEqual(now);
  });
});
