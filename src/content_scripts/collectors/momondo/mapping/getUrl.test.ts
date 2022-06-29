import { getUrl } from "./getUrl";

describe("getUrl happy path", () => {
  it("works roundtrip", () => {
    const value = getUrl({
      from: { value: "DTW", key: "", label: "", name: "", location: "", type: "AIRPORT" },
      to: { value: "NYC", key: "", label: "", name: "", location: "", type: "AIRPORT" },
      fromDate: "04/19/2022",
      toDate: "04/22/2022",
      roundtrip: true,
      numPax: 1,
      searchByPoints: false,
      pointsType: "CHASE-SAPPHIRE-PREFERRED",
    });
    expect(value).toEqual(
      "https://www.momondo.com/flight-search/DTW-NYC/2022-04-19/2022-04-22/economy/1adults?sort=bestflight_a&fs=cabin=e,bfbe",
    );
  });

  it("1way", () => {
    const value = getUrl({
      from: { value: "DTW", key: "", label: "", name: "", location: "", type: "AIRPORT" },
      to: { value: "NYC", key: "", label: "", name: "", location: "", type: "AIRPORT" },
      fromDate: "04/19/2022",
      toDate: "04/22/2022",
      roundtrip: false,
      numPax: 1,
      searchByPoints: false,
      pointsType: "CHASE-SAPPHIRE-PREFERRED",
    });
    expect(value).toEqual(
      "https://www.momondo.com/flight-search/DTW-NYC/2022-04-19/economy/1adults?sort=bestflight_a&fs=cabin=e,bfbe",
    );
  });
});
