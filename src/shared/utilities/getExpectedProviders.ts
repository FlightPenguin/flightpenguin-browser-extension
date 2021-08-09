export const getExpectedProviders = (searchByPoints: boolean) => {
  return searchByPoints
    ? ["expedia"]
    : [
        // Comment out as appropriate when debugging
        "southwest",
        "skyscanner",
        "expedia",
      ];
};
