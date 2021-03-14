const standardizeTimeString = function (time) {
  return time.toLowerCase().replace(" ", "").trim();
};

export { standardizeTimeString };