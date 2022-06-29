import { ACTIVE_SUPPRESSION_KEY } from "./constants";
import { suppressOfferFlightPenguinPopup } from "./suppressOfferFlightPenguinPopup";

describe("suppressOfferFlightPenguinPopup tests", () => {
  beforeEach(() => {
    sessionStorage.removeItem(ACTIVE_SUPPRESSION_KEY);
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.removeItem(ACTIVE_SUPPRESSION_KEY);
  });

  it("works", () => {
    suppressOfferFlightPenguinPopup();
    expect(sessionStorage.setItem).toHaveBeenCalledWith(ACTIVE_SUPPRESSION_KEY, "true");
  });
});
