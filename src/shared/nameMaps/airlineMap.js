const AirlineMap = {
  airlineDetailsMap: {
    "American Airlines": { display: "American", color: "#C5423E", code: "AA" },
    American: { display: "American", color: "#C5423E", code: "AA" },
    Delta: { display: "Delta", color: "#EE722E", code: "DL" },
    "Delta Air Lines": { display: "Delta", color: "#EE722E", code: "DL" },
    "Southwest Airlines": { display: "Southwest", color: "#F6C04D", code: "WN" },
    Southwest: { display: "Southwest", color: "#F6C04D", code: "WN" },
    United: { display: "United", color: "#235EA6", code: "UA" },
    "United Airlines": { display: "United", color: "#235EA6", code: "UA" },
    "Air Canada": { display: "Air Canada", color: "#E53222", code: "AC" },
    Alaska: { display: "Alaska", color: "#51172C", code: "AS" },
    "Alaska Airlines": { display: "Alaska", color: "#51172C", code: "AS" },
    jetBlue: { display: "jetBlue", color: "#5F90C8", code: "B6" },
    "JetBlue Airways": { display: "jetBlue", color: "#5F90C8", code: "B6" },
    Spirit: { display: "Spirit", color: "#BBB140", code: "NK" },
    "Spirit Airlines": { display: "Spirit", color: "#BBB140", code: "NK" },
    WestJet: { display: "WestJet", color: "#4BA89C", code: "WS" },
    Aeromexico: { display: "Aeromexico", color: "#000000", code: "AM" },
    Frontier: { display: "Frontier", color: "#378055", code: "F9" },
    "Frontier Airlines": { display: "Frontier", color: "#378055", code: "F9" },
    // "Volaris": { display: "Volaris", color: "#84417B", code: "Y4" }, // Seems like Priceline doeesn't show Volaris
    Interjet: { display: "Interjet", color: "#A8A8A8", code: "4O" },
    // "Allegiant": { display: "Allegiant", color: "#CAB83D", code: "G4" }, // Seems like Priceline doesn't show Allegiant
    "Hawaiian Airlines": { display: "Hawaiian", color: "#4D388A", code: "HA" },
    // "VivaAerobus": { display: "VivaAerobus", color: "", code: "" }, // Seems like Priceline doesn't show VivaAerobus
    "Sun Country": {
      display: "Sun Country",
      color: "#D79A71",
      code: "SY",
    },
    "Sun Country Airlines": {
      display: "Sun Country",
      color: "#D79A71",
      code: "SY",
    },
    "Porter Airlines": { display: "Porter", color: "#0F2B53", code: "PD" },
    // "Ryanair": {display: "Ryanair", color: "#ECC954", code: "FR" }, // Seems like Priceline doesn't show Ryanair
    "China Southern Airlines": {
      display: "China Southern",
      color: "#93ACCA",
      code: "CZ",
    },
    Lufthansa: { display: "Lufthansa", color: "#EFB95D", code: "LH" },
    SWISS: { display: "Swiss", color: "#D42D21", code: "LX" },
    "China Eastern Airlines": {
      display: "China Eastern",
      color: "#A9545F",
      code: "MU",
    },
    "British Airways": { display: "British", color: "#EA8E8C", code: "BA" },
    Iberia: { display: "Iberia", color: "#D05653", code: "IB" },
    "Air China": { display: "Air China", color: "#DF524B", code: "CA" },
    "Emirates Airlines": { display: "Emirates", color: "#CF534F", code: "EK" },
    "KLM-Royal Dutch Airlines": { display: "KLM", color: "#44A0DC", code: "KL" },
    "Air France": { display: "Air France", color: "#DB3832", code: "AF" },
    "Turkish Airlines": { display: "Turkish", color: "#DB3832", code: "TK" },
    "Cathay Pacific": { display: "Cathay", color: "#2A645A", code: "CX" },
    "Cathay Dragon": { display: "Cathay", color: "#2A645A", code: "CX" },
    "EVA Airways": { display: "EVA", color: "#6F9F64", code: "BR" },
    "China Airlines": { display: "China Airlines", color: "#DAABB1", code: "CI" },
    "ANA Airlines": { display: "ANA", color: "#254897", code: "NH" },
    "Japan Airlines": { display: "Japan Airlines", color: "#E56E69", code: "JL" },
    "Air India": { display: "Air India", color: "#D47346", code: "AI" },
    "Air India Limited": { display: "Air India", color: "#D47346", code: "AI" },
    "Qantas Airways": { display: "Qantas", color: "#E34538", code: "QF" },
    "Singapore Airlines": { display: "Singapore", color: "#EFA952", code: "SQ" },
    "ANA (All Nippon Airways)": { display: "ANA", color: "#0f4a8d" },
  },
  getAirlineName: function (airlineName) {
    if (!airlineName || typeof airlineName !== "string") {
      return;
    }
    let formattedAirlineName = airlineName.trim().replace(/\s+/g, " ");
    const airlineDetails = this.airlineDetailsMap[formattedAirlineName];
    if (airlineDetails) {
      formattedAirlineName = airlineDetails.display;
    }

    return formattedAirlineName;
  },
  getAirlineDetails: function (airlineName) {
    let formattedAirlineName = airlineName.trim().replace(/\s+/g, " ");

    return (
      this.airlineDetailsMap[formattedAirlineName] || {
        display: formattedAirlineName,
        color: "#DFCCFB",
      }
    );
  },
};
export default AirlineMap;
