import { SELECTION_SUPPRESSION_KEY } from "./constants";
import { setSuppressionFlag } from "./setSuppressionFlag";

describe("setSuppressionFlag tests", () => {
  beforeEach(() => {
    localStorage.removeItem(SELECTION_SUPPRESSION_KEY);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem(SELECTION_SUPPRESSION_KEY);
  });

  it("works", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => new Date("2019-05-14T11:01:58.135Z").valueOf());
    setSuppressionFlag(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(SELECTION_SUPPRESSION_KEY, "2019-05-15T11:01:58Z");
  });
});
