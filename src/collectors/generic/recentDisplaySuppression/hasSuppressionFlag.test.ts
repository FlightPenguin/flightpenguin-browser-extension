import { addDays, formatISO } from "date-fns";

import { SELECTION_SUPPRESSION_KEY } from "./constants";
import { hasSuppressionFlag } from "./hasSuppressionFlag";

describe("hasSuppressionFlag tests", () => {
  beforeEach(() => {
    localStorage.removeItem(SELECTION_SUPPRESSION_KEY);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem(SELECTION_SUPPRESSION_KEY);
  });

  it("accesses localstorage", () => {
    hasSuppressionFlag();
    expect(localStorage.getItem).toHaveBeenCalledWith(SELECTION_SUPPRESSION_KEY);
  });

  it("works when set to undefined", () => {
    const value = hasSuppressionFlag();
    expect(value).toEqual(false);
  });

  it("works when set to null", () => {
    localStorage.setItem(SELECTION_SUPPRESSION_KEY, "null");

    const value = hasSuppressionFlag();
    expect(value).toEqual(false);
  });

  it("works when set to future", () => {
    const now = Date.now();
    localStorage.setItem(SELECTION_SUPPRESSION_KEY, formatISO(addDays(now, 1)));

    const value = hasSuppressionFlag();
    expect(value).toEqual(true);
  });

  it("works when set to past", () => {
    const now = Date.now();
    localStorage.setItem(SELECTION_SUPPRESSION_KEY, formatISO(addDays(now, -1)));

    const value = hasSuppressionFlag();
    expect(value).toEqual(false);
  });
});
