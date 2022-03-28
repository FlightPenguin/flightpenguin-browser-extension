import capitalize from "lodash.capitalize";

const cleanAlaskaAirlinesOperatingName = (airlineName) => {
  const alaskaRegex = /^(?<airline>[\s\w]*)\s+as\s+(?<dbaPart1>alaska)(?<dbaPart2>[a-z]{1,20})$/i;
  let cleanedName = airlineName;
  if (alaskaRegex.test(cleanedName)) {
    const nameGroups = cleanedName.match(alaskaRegex);
    cleanedName = `${nameGroups.groups.airline} as ${nameGroups.groups.dbaPart1} ${capitalize(
      nameGroups.groups.dbaPart2,
    )}`;
  }
  return cleanedName;
};

const AirlineMap = {
  airlineDetailsMap: {
    "American Airlines": { display: "American", color: "#C5423E", code: "AA" },
    American: { display: "American", color: "#C5423E", code: "AA" },
    Delta: { display: "Delta", color: "#EE722E", code: "DL" },
    "Delta Air Lines": { display: "Delta", color: "#EE722E", code: "DL" },
    WN: { display: "WN", color: "#F6C04D", code: "WN" },
    "Southwest Airlines": { display: "WN", color: "#F6C04D", code: "WN" },
    Southwest: { display: "WN", color: "#F6C04D", code: "WN" },
    United: { display: "United", color: "#235EA6", code: "UA" },
    "United Airlines": { display: "United", color: "#235EA6", code: "UA" },
    "Air Canada": { display: "Air Canada", color: "#E53222", code: "AC" },
    Alaska: { display: "Alaska", color: "#51172C", code: "AS" },
    "Alaska Airlines": { display: "Alaska", color: "#51172C", code: "AS" },
    jetBlue: { display: "jetBlue", color: "#5F90C8", code: "B6" },
    "JetBlue Airways": { display: "jetBlue", color: "#5F90C8", code: "B6" },
    "Jetblue Airways": { display: "jetBlue", color: "#5F90C8", code: "B6" },
    jetblue: { display: "jetBlue", color: "#5F90C8", code: "B6" },
    Spirit: { display: "Spirit", color: "#BBB140", code: "NK" },
    "Spirit Airlines": { display: "Spirit", color: "#BBB140", code: "NK" },
    WestJet: { display: "WestJet", color: "#4BA89C", code: "WS" },
    Aeromexico: { display: "Aeromexico", color: "#000000", code: "AM" },
    Frontier: { display: "Frontier", color: "#378055", code: "F9" },
    "Frontier Airlines": { display: "Frontier", color: "#378055", code: "F9" },
    // "Volaris": { display: "Volaris", color: "#84417B", code: "Y4" }, // Seems like Priceline doeesn't show Volaris
    Interjet: { display: "Interjet", color: "#A8A8A8", code: "4O" },
    Icelandair: { display: "Icelandair", color: "#043C84", code: "FI" },
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
    Lufthansa: { display: "Lufthansa", color: "#0A1D3D", code: "LH" },
    Swiss: { display: "Swiss", color: "#D42D21", code: "LX" },
    SWISS: { display: "Swiss", color: "#D42D21", code: "LX" },
    "Swiss International Air Lines": { display: "Swiss", color: "#D42D21", code: "LX" },
    "China Eastern Airlines": {
      display: "China Eastern",
      color: "#A9545F",
      code: "MU",
    },
    British: { display: "British", color: "#EA8E8C", code: "BA" },
    "British Airways": { display: "British", color: "#EA8E8C", code: "BA" },
    Iberia: { display: "Iberia", color: "#D05653", code: "IB" },
    "Iberia Airlines": { display: "Iberia", color: "#D05653", code: "IB" },
    "Air China": { display: "Air China", color: "#DF524B", code: "CA" },
    "Emirates Airlines": { display: "Emirates", color: "#CF534F", code: "EK" },
    KLM: { display: "KLM", color: "#44A0DC", code: "KL" },
    "KLM-Royal Dutch Airlines": { display: "KLM", color: "#44A0DC", code: "KL" },
    "KLM Royal Dutch Airlines": { display: "KLM", color: "#44A0DC", code: "KL" },
    "Air France": { display: "Air France", color: "#DB3832", code: "AF" },
    "Turkish Airlines": { display: "Turkish", color: "#DB3832", code: "TK" },
    "Cathay Pacific": { display: "Cathay", color: "#2A645A", code: "CX" },
    "Cathay Dragon": { display: "Cathay", color: "#2A645A", code: "CX" },
    "EVA Airways": { display: "EVA", color: "#6F9F64", code: "BR" },
    "China Airlines": { display: "China Airlines", color: "#DAABB1", code: "CI" },
    ANA: { display: "ANA", color: "#254897", code: "NH" },
    "All Nippon Airways": { display: "ANA", color: "#254897", code: "NH" },
    "ANA Airlines": { display: "ANA", color: "#254897", code: "NH" },
    "Japan Airlines": { display: "Japan Airlines", color: "#E56E69", code: "JL" },
    "Air India": { display: "Air India", color: "#D47346", code: "AI" },
    "Air India Limited": { display: "Air India", color: "#D47346", code: "AI" },
    "Qantas Airways": { display: "Qantas", color: "#E34538", code: "QF" },
    "Singapore Airlines": { display: "Singapore", color: "#EFA952", code: "SQ" },
    "ANA (All Nippon Airways)": { display: "ANA", color: "#0f4a8d" },
    "Breeze Airways": { display: "Breeze Airways", color: "#ABC3EB", code: "MX" },
    "Virgin Atlantic": { display: "Virgin Atlantic", color: "#AA1C2A", code: "VS" },
    "Virgin Atlantic Airways": { display: "Virgin Atlantic", color: "#AA1C2A", code: "VS" },
    Finnair: { display: "Finnair", color: "#7F1F89", code: "AY" },
    "Scandinavian Airlines": { display: "Scandinavian", color: "#2B3087", code: "SK" },
    SAS: { display: "Scandinavian", color: "#2B3087", code: "SK" },
    Austrian: { display: "Austrian", color: "#D41C04", code: "OS" },
    "Austrian Airlines": { display: "Austrian", color: "#D41C04", code: "OS" },
    "Aer Lingus": { display: "Aer Lingus", color: "#008274", code: "EI" },
    Aeroflot: { display: "Aeroflot", color: "#3C72A8", code: "SU" },
    "Aeroflot-Russian Airlines": { display: "Aeroflot", color: "#3C72A8", code: "SU" },
    TAP: { display: "TAP", color: "#CC2C34", code: "TP" },
    "TAP Air Portugal": { display: "TAP", color: "#CC2C34", code: "TP" },
    Vistara: { display: "Vistara", color: "#47143D", code: "UK" },
    "Air Vistara": { display: "Vistara", color: "#47143D", code: "UK" },
    Indigo: { display: "IndiGo", color: "#3A469D", code: "6E" },
    IndiGo: { display: "IndiGo", color: "#3A469D", code: "6E" },
    "IndiGo Airlines": { display: "IndiGo", color: "#3A469D", code: "6E" },
    "Air Arabia": { display: "Air Arabia", color: "#FC0444", code: "G9" },
    "Qatar Airways": { display: "Qatar Airways", color: "#5C0632", code: "QR" },
    "Jazeera Airways": { display: "Jazeera Airways", color: "#1484C4", code: "J9" },
    "Etihad Airways": { display: "Etihad Airways", color: "#251019", code: "EY" },
    "Korean Air": { display: "Korean Air", color: "#154D9E", code: "KE" },
    "LATAM Airlines": { display: "LATAM Airlines", color: "#2A0087", code: "LA" },
    Aerolineas: { display: "Aerolineas", color: "#007ac2", code: "AR" },
    Avianca: { display: "Avianca", color: "#DA291C", code: "AV" },
    "Azul Linhas Aereas Brasileiras": { display: "Azul Brazilian", color: "#6ca9db", code: "AD" },
    "Copa Airlines": { display: "Copa", color: "#0060a9", code: "CM" },
  },
  getAirlineName: function (airlineName) {
    if (!airlineName || typeof airlineName !== "string") {
      return;
    }
    let formattedAirlineName = airlineName.trim().replace(/\s+/g, " ");
    formattedAirlineName = cleanAlaskaAirlinesOperatingName(formattedAirlineName);
    const airlineDetails = this.airlineDetailsMap[formattedAirlineName];
    if (airlineDetails) {
      formattedAirlineName = airlineDetails.display;
    }

    return formattedAirlineName;
  },
  getAirlineDetails: function (airlineName) {
    let formattedAirlineName = airlineName.trim().replace(/\s+/g, " ");
    formattedAirlineName = cleanAlaskaAirlinesOperatingName(formattedAirlineName);
    return (
      this.airlineDetailsMap[formattedAirlineName] || {
        display: formattedAirlineName,
        color: "#DFCCFB",
      }
    );
  },
};
export default AirlineMap;
