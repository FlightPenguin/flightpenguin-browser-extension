const regionalAirlines = [
  "Aer Lingus Regional",
  "Aeromexico Connect",
  "SkyWest",
  "Alaska Horizon",
  "Horizon Air",
  "Alitalia CityLiner",
  "Air Canada Express",
  "Air New Zealand Link",
  "American Eagle",
  "Delta Connection",
  "Fiji Link",
  "HOP!",
  "Iberia Regional",
  "KLM Cityhopper",
  "Lufthansa Regional",
  "Moçambique Expresso",
  "Ohana by Hawaiian",
  "PAL Express",
  "QantasLink",
  "South African Express",
  "TAP Express",
  "Tunisair Express",
  "United Express",
  "Virgin Australia Regional Airlines",
  "WestJet Encore",
  "WestJet Link",
];

function isRegionalAirline(airline) {
  const airlineTarget = airline.toLowerCase();
  const found = regionalAirlines.find((regional) =>
    airlineTarget.includes(regional.toLowerCase())
  );
  return Boolean(found);
}
export default isRegionalAirline;
