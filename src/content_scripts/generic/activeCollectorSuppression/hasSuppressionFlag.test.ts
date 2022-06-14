import { ACTIVE_SUPPRESSION_KEY } from "./constants";
import { hasSuppressionFlag } from "./hasSuppressionFlag";

describe("hasSuppressionFlag tests", () => {
  beforeEach(() => {
    sessionStorage.removeItem(ACTIVE_SUPPRESSION_KEY);
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.removeItem(ACTIVE_SUPPRESSION_KEY);
  });

  it("accesses localstorage", () => {
    hasSuppressionFlag();
    expect(sessionStorage.getItem).toHaveBeenCalledWith(ACTIVE_SUPPRESSION_KEY);
  });

  it("works when set to undefined", () => {
    const value = hasSuppressionFlag();
    expect(value).toEqual(false);
  });

  it("works when set to null", () => {
    sessionStorage.setItem(ACTIVE_SUPPRESSION_KEY, "null");

    const value = hasSuppressionFlag();
    expect(value).toEqual(false);
  });

  it("works when set to false", () => {
    sessionStorage.setItem(ACTIVE_SUPPRESSION_KEY, "false");

    const value = hasSuppressionFlag();
    expect(value).toEqual(false);
  });

  it("works when set to true", () => {
    sessionStorage.setItem(ACTIVE_SUPPRESSION_KEY, "true");

    const value = hasSuppressionFlag();
    expect(value).toEqual(true);
  });

  it("explodes when incorrectly set", () => {
    sessionStorage.setItem(ACTIVE_SUPPRESSION_KEY, "meow");

    expect(() => {
      hasSuppressionFlag();
    }).toThrow("Unexpected token m in JSON at position 0");
  });
});
