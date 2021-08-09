export const getExpectedProviders = (searchByPoints: boolean) => {
  return searchByPoints ? ["expedia"] : ["southwest", "skyscanner", "expedia"];
};
