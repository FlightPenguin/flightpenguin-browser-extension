// We only have Priceline and Southwest so only need to use one mapping system right now.
// In the future, we can have maps for each provider.
// Added two-letter code in case we need it so we we have a way to map the same airline across providers
// Also, for Pricline I'm using the name that shows up when you hover over the logo
const airlinesMap = {
  American: { display: "American", color: "#C5423E", code: "AA" },
  Delta: { display: "Delta", color: "#EE722E", code: "DL" },
  Southwest: { display: "Southwest", color: "#F6C04D", code: "WN" },
  United: { display: "United", color: "#235EA6", code: "UA" },
  "Air Canada": { display: "Air Canada", color: "#E53222", code: "AC" },
  "Alaska Airlines": { display: "Alaska", color: "#51172C", code: "AS" },
  "JetBlue Airways": { display: "JetBlue", color: "#5F90C8", code: "B6" },
  "Spirit Airlines": { display: "Spirit", color: "#BBB140", code: "NK" },
  WestJet: { display: "WestJet", color: "#4BA89C", code: "WS" },
  Aeromexico: { display: "Aeromexico", color: "#000000", code: "AM" },
  "Frontier Airlines": { display: "Frontier", color: "#378055", code: "F9" },
  // "Volaris": { display: "Volaris", color: "#84417B", code: "Y4" }, // Seems like Priceline doeesn't show Volaris
  Interjet: { display: "Interjet", color: "#A8A8A8", code: "4O" },
  // "Allegiant": { display: "Allegiant", color: "#CAB83D", code: "G4" }, // Seems like Priceline doesn't show Allegiant
  "Hawaiian Airlines": { display: "Hawaiian", color: "#4D388A", code: "HA" },
  // "VivaAerobus": { display: "VivaAerobus", color: "", code: "" }, // Seems like Priceline doesn't show VivaAerobus
  "Sun Country Airlines": {
    display: "Sun Country",
    color: "#D79A71",
    code: "SY",
  },
  "Porter Airlines": { display: "Porter", color: "#0F2B53", code: "PD" },
};
// For other airlines not listed above let's use #DFCCFB
export default airlinesMap;
