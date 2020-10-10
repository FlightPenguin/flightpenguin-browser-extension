var Helpers = (function () {
  const standardizeTimeString = function (time) {
    return time.toLowerCase().replace(" ", "").trim();
  };
  return {
    standardizeTimeString,
  };
})();
