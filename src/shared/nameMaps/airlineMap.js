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
    ANA: { display: "ANA", color: "#254897", code: "NH", alliance: "Star Alliance" },
    "ANA (All Nippon Airways)": { display: "ANA", color: "#0f4a8d", alliance: "Star Alliance" },
    "ANA Airlines": { display: "ANA", color: "#254897", code: "NH", alliance: "Star Alliance" },
    "All Nippon Airways": { display: "ANA", color: "#254897", code: "NH", alliance: "Star Alliance" },
    Aegean: { display: "Aegean", color: "#94A4D4", code: "A3", alliance: "Star Alliance" },
    "Aegean Airlines": { display: "Aegean", color: "#94A4D4", code: "A3", alliance: "Star Alliance" },
    "Aer Lingus": { display: "Aer Lingus", color: "#008274", code: "EI", alliance: undefined },
    Aeroflot: { display: "Aeroflot", color: "#3C72A8", code: "SU", alliance: "SkyTeam" },
    "Aeroflot-Russian Airlines": { display: "Aeroflot", color: "#3C72A8", code: "SU", alliance: "SkyTeam" },
    Aerolineas: { display: "Aerolineas", color: "#007ac2", code: "AR", alliance: "SkyTeam" },
    "Aerolineas Argentinas": { display: "Aerolineas", color: "#007ac2", code: "AR", alliance: "SkyTeam" },
    Aeromexico: { display: "Aeromexico", color: "#000000", code: "AM", alliance: "SkyTeam" },
    AirAsia: { display: "AirAsia", color: "#E32526", code: "AK", alliance: undefined },
    "Air Asia": { display: "AirAsia", color: "#E32526", code: "AK", alliance: undefined },
    AIRASIA: { display: "AirAsia", color: "#E32526", code: "AK", alliance: undefined },
    Aircalin: { display: "Aircalin", color: "#F44B24", code: "SB", alliance: undefined },
    "Air Arabia": { display: "Air Arabia", color: "#FC0444", code: "G9", alliance: undefined },
    "Air Astana": { display: "Air Astana", color: "#A48C64", code: "KC", alliance: undefined },
    "Air Austral": { display: "Air Austral", color: "#26b5e3", code: "UU", alliance: "Vanilla Alliance" },
    "Air Baltic": { display: "airBaltic", color: "#D3EB3B", code: "BT", alliance: undefined },
    AirBaltic: { display: "airBaltic", color: "#D3EB3B", code: "BT", alliance: undefined },
    airBaltic: { display: "airBaltic", color: "#D3EB3B", code: "BT", alliance: undefined },
    "Air Belgium": { display: "Air Belgium", color: "#F43444", code: "KF", alliance: undefined },
    "Air Canada": { display: "Air Canada", color: "#E53222", code: "AC", alliance: "Star Alliance" },
    "Air Caraibes": { display: "Air Caraibes", color: "#75C141", code: "TX", alliance: undefined },
    "Air China": { display: "Air China", color: "#DF524B", code: "CA", alliance: "Star Alliance" },
    "Air Corsica": { display: "Air Corsica", color: "#048CCC", code: "XK", alliance: undefined },
    "Air Dolomiti": { display: "Air Dolomiti", color: "#008e8f", code: "EN", alliance: undefined },
    "Air Europa": { display: "Air Europa", color: "#0474CC", code: "UX", alliance: "SkyTeam" },
    "Air France": { display: "Air France", color: "#DB3832", code: "AF", alliance: "SkyTeam" },
    "Air India": { display: "Air India", color: "#D47346", code: "AI", alliance: "Star Alliance" },
    "Air India Limited": { display: "Air India", color: "#D47346", code: "AI", alliance: "Star Alliance" },
    "Air Macau": { display: "Air Macau", color: "#342464", code: "NX", alliance: undefined },
    "Air Malta": { display: "Air Malta", color: "#e77027", code: "KM", alliance: undefined },
    "Air Mauritius": { display: "Air Mauritius", color: "#C4042C", code: "MK", alliance: "Vanilla Alliance" },
    "Air Namibia": { display: "Air Namibia", color: "#FBF304", code: "SW", alliance: undefined },
    "Air New Zealand": { display: "Air New Zealand", color: "#241C24", code: "NZ", alliance: "Star Alliance" },
    "Air North": { display: "Air North", color: "#F47B20", code: "4N", alliance: undefined },
    "Air Seoul": { display: "Air Seoul", color: "#048B7B", code: "RS", alliance: "Star Alliance" },
    "Air Serbia": { display: "Air Serbia", color: "#0C4484", code: "JU", alliance: undefined },
    "Air Tahiti Nui": { display: "Air Tahiti Nui", color: "#2CCCD4", code: "TN", alliance: undefined },
    "Air Transat": { display: "Air Transat", color: "#3CBCEC", code: "TS", alliance: undefined },
    "Air Vanuatu": { display: "Air Vanuatu", color: "#009543", code: "NF", alliance: undefined },
    "Air Vistara": { display: "Vistara", color: "#47143D", code: "UK", alliance: undefined },
    Alaska: { display: "Alaska", color: "#51172C", code: "AS", alliance: "Oneworld" },
    "Alaska Airlines": { display: "Alaska", color: "#51172C", code: "AS", alliance: "Oneworld" },
    Alitilia: { display: "ITA Airways", color: "#04643C", code: "AZ", alliance: "SkyTeam" },
    "ITA Airways": { display: "ITA Airways", color: "#04643C", code: "AZ", alliance: "SkyTeam" },
    Allegiant: { display: "Allegiant", color: "#FBCE21", code: "G4", alliance: undefined },
    "Allegiant Air": { display: "Allegiant", color: "#FBCE21", code: "G4", alliance: undefined },
    American: { display: "American", color: "#C5423E", code: "AA", alliance: "Oneworld" },
    "American Airlines": { display: "American", color: "#C5423E", code: "AA", alliance: "Oneworld" },
    Austrian: { display: "Austrian", color: "#D41C04", code: "OS", alliance: "Star Alliance" },
    "Austrian Airlines": { display: "Austrian", color: "#D41C04", code: "OS", alliance: "Star Alliance" },
    Asiana: { display: "Asiana", color: "#FC0404", code: "OZ", alliance: "Star Alliance" },
    "Asiana Air": { display: "Asiana", color: "#FC0404", code: "OZ", alliance: "Star Alliance" },
    "Asiana Airlines": { display: "Asiana", color: "#FC0404", code: "OZ", alliance: "Star Alliance" },
    Avianca: { display: "Avianca", color: "#DA291C", code: "AV", alliance: "Star Alliance" },
    Azerbaijan: { display: "Azerbaijan", color: "#7CCCE4", code: "J2", alliance: undefined },
    "Azerbaijan Airlines": { display: "Azerbaijan", color: "#7CCCE4", code: "J2", alliance: undefined },
    Azul: { display: "Azul Brazilian", color: "#6ca9db", code: "AD", alliance: undefined },
    "Azul Linhas Aereas Brasileiras": { display: "Azul Brazilian", color: "#6ca9db", code: "AD", alliance: undefined },
    Bamboo: { display: "Bamboo", color: "#64AC53", code: "QH", alliance: undefined },
    "Bamboo Airways": { display: "Bamboo", color: "#64AC53", code: "QH", alliance: undefined },
    Bangkok: { display: "Bangkok Airways", color: "#BC9454", code: "PG", alliance: undefined },
    "Bangkok Airways": { display: "Bangkok Airways", color: "#BC9454", code: "PG", alliance: undefined },
    Breeze: { display: "Breeze", color: "#ABC3EB", code: "MX", alliance: undefined },
    "Breeze Airways": { display: "Breeze", color: "#ABC3EB", code: "MX", alliance: undefined },
    British: { display: "British", color: "#EA8E8C", code: "BA", alliance: "Oneworld" },
    "British Airways": { display: "British", color: "#EA8E8C", code: "BA", alliance: "Oneworld" },
    Brussels: { display: "Brussels", color: "#EE452A", code: "SN", alliance: "Star Alliance" },
    "Brussels Airlines": { display: "Brussels", color: "#EE452A", code: "SN", alliance: "Star Alliance" },
    Carribean: { display: "Carribean", color: "#C759A2", code: "BW", alliance: undefined },
    "Carribean Airlines": { display: "Carribean", color: "#C759A2", code: "BW", alliance: undefined },
    "Cathay Dragon": { display: "Cathay Dragon", color: "#E70013", code: "KA", alliance: "Oneworld" },
    Cathay: { display: "Cathay Pacific", color: "#00645A", code: "CX", alliance: "Oneworld" },
    "Cathay Pacific": { display: "Cathay Pacific", color: "#00645A", code: "CX", alliance: "Oneworld" },
    Cayman: { display: "Cayman Airways", color: "#43932C", code: "KX", alliance: undefined },
    "Cayman Airways": { display: "Cayman Airways", color: "#43932C", code: "KX", alliance: undefined },
    Cebu: { display: "Cebu Pacific", color: "#049484", code: "5J", alliance: "Value Alliance" },
    CEBU: { display: "Cebu Pacific", color: "#049484", code: "5J", alliance: "Value Alliance" },
    "Cebu Pacific": { display: "Cebu Pacific", color: "#049484", code: "5J", alliance: "Value Alliance" },
    "Cebu Pacific Air": { display: "Cebu Pacific", color: "#049484", code: "5J", alliance: "Value Alliance" },
    "China Airlines": { display: "China Airlines", color: "#DAABB1", code: "CI", alliance: "SkyTeam" },
    "China Eastern Airlines": { display: "China Eastern", color: "#A9545F", code: "MU", alliance: "SkyTeam" },
    "China Southern Airlines": { display: "China Southern", color: "#93ACCA", code: "CZ", alliance: undefined },
    Condor: { display: "Condor", color: "#FBAB18", code: "DE", alliance: undefined },
    "Condor Air": { display: "Condor", color: "#FBAB18", code: "DE", alliance: undefined },
    "Condor Airlines": { display: "Condor", color: "#FBAB18", code: "DE", alliance: undefined },
    Copa: { display: "Copa", color: "#0060a9", code: "CM", alliance: "Star Alliance" },
    "Copa Airlines": { display: "Copa", color: "#0060a9", code: "CM", alliance: "Star Alliance" },
    Croatia: { display: "Croatia Airlines", color: "#EC3C34", code: "OU", alliance: "Star Alliance" },
    "Croatia Airlines": { display: "Croatia Airlines", color: "#EC3C34", code: "OU", alliance: "Star Alliance" },
    CSA: { display: "Copa", color: "#EC041C", code: "OK", alliance: "SkyTeam" },
    Czech: { display: "Copa", color: "#EC041C", code: "OK", alliance: "SkyTeam" },
    "Czech Airlines": { display: "Copa", color: "#EC041C", code: "OK", alliance: "SkyTeam" },
    Delta: { display: "Delta", color: "#EE722E", code: "DL", alliance: "SkyTeam" },
    "Delta Air Lines": { display: "Delta", color: "#EE722E", code: "DL", alliance: "SkyTeam" },
    easyJet: { display: "easyJet", color: "#ff6600", code: "EC", alliance: undefined },
    EasyJet: { display: "easyJet", color: "#ff6600", code: "EC", alliance: undefined },
    Easyjet: { display: "easyJet", color: "#ff6600", code: "EC", alliance: undefined },
    Edelweiss: { display: "Edelweiss", color: "#F6E80F", code: "WK", alliance: undefined },
    "Edelweiss Air": { display: "Edelweiss", color: "#F6E80F", code: "WK", alliance: undefined },
    EGYPTAIR: { display: "Egyptair", color: "#00265d", code: "MS", alliance: "Star Alliance" },
    EgyptAir: { display: "Egyptair", color: "#00265d", code: "MS", alliance: "Star Alliance" },
    Egyptair: { display: "Egyptair", color: "#00265d", code: "MS", alliance: "Star Alliance" },
    "El Al": { display: "El Al", color: "#041444", code: "LY", alliance: undefined },
    Emirates: { display: "Emirates", color: "#D71A21", code: "EK", alliance: undefined },
    "Emirates Airlines": { display: "Emirates", color: "#CF534F", code: "EK", alliance: undefined },
    Ethiopian: { display: "Ethiopian", color: "#548C44", code: "ET", alliance: "Star Alliance" },
    "Ethiopian Airlines": { display: "Ethiopian", color: "#548C44", code: "ET", alliance: "Star Alliance" },
    "Etihad Airways": { display: "Etihad Airways", color: "#251019", code: "EY", alliance: undefined },
    Eurowings: { display: "Eurowings", color: "#8F174F", code: "EW", alliance: undefined },
    EVA: { display: "EVA", color: "#6F9F64", code: "BR", alliance: "Star Alliance" },
    "EVA Air": { display: "EVA", color: "#6F9F64", code: "BR", alliance: "Star Alliance" },
    "EVA Airways": { display: "EVA", color: "#6F9F64", code: "BR", alliance: "Star Alliance" },
    Fiji: { display: "Fiji Airways", color: "#2C1C14", code: "FJ", alliance: "Oneworld" },
    "Fiji Airways": { display: "Fiji Airways", color: "#2C1C14", code: "FJ", alliance: "Oneworld" },
    Finnair: { display: "Finnair", color: "#7F1F89", code: "AY", alliance: "Oneworld" },
    flydubai: { display: "flydubai", color: "#FF8200", code: "FZ", alliance: undefined },
    Flydubai: { display: "flydubai", color: "#FF8200", code: "FZ", alliance: undefined },
    FlyDubai: { display: "flydubai", color: "#FF8200", code: "FZ", alliance: undefined },
    FlyOne: { display: "FlyOne", color: "#0494DC", code: "5F", alliance: undefined },
    "French bee": { display: "French Bee", color: "#04A4E3", code: "BF", alliance: undefined },
    "French Bee": { display: "French Bee", color: "#04A4E3", code: "BF", alliance: undefined },
    "French Bee SAS": { display: "French Bee", color: "#04A4E3", code: "BF", alliance: undefined },
    Frontier: { display: "Frontier", color: "#378055", code: "F9", alliance: undefined },
    "Frontier Airlines": { display: "Frontier", color: "#378055", code: "F9", alliance: undefined },
    Garuda: { display: "Garuda Indonesia", color: "#047C94", code: "GA", alliance: "SkyTeam" },
    "Garuda Indonesia": { display: "Garuda Indonesia", color: "#047C94", code: "GA", alliance: "SkyTeam" },
    Gol: { display: "GOL", color: "#FC7423", code: "G3", alliance: undefined },
    GOL: { display: "GOL", color: "#FC7423", code: "G3", alliance: undefined },
    "GOL Linhas Aereas Inteligentes": { display: "GOL", color: "#FC7423", code: "G3", alliance: undefined },
    Gulf: { display: "Gulf Air", color: "#B4A483", code: "GF", alliance: undefined },
    "Gulf Air": { display: "Gulf Air", color: "#B4A483", code: "GF", alliance: undefined },
    Hainan: { display: "Hainan", color: "#e60012", code: "HU", alliance: undefined },
    "Hainan Airlines": { display: "Hainan", color: "#e60012", code: "HU", alliance: undefined },
    Hawaiian: { display: "Hawaiian", color: "#4D388A", code: "HA", alliance: undefined },
    "Hawaiian Airlines": { display: "Hawaiian", color: "#4D388A", code: "HA", alliance: undefined },
    Helvetic: { display: "Helvetic", color: "#E4241C", code: "2L", alliance: undefined },
    "Helvetic Airlines": { display: "Helvetic", color: "#E4241C", code: "2L", alliance: undefined },
    "Hong Kong Express": { display: "Hong Kong Express", color: "#6C2C94", code: "UO", alliance: "Oneworld" },
    "HK Express": { display: "Hong Kong Express", color: "#6C2C94", code: "UO", alliance: "Oneworld" },
    "Hong Kong Airlines": { display: "Hong Kong Airlines", color: "#E40414", code: "HX", alliance: undefined },
    Iberia: { display: "Iberia", color: "#D05653", code: "IB", alliance: "Oneworld" },
    IBERIA: { display: "Iberia", color: "#D05653", code: "IB", alliance: "Oneworld" },
    "Iberia Airlines": { display: "Iberia", color: "#D05653", code: "IB", alliance: "Oneworld" },
    Icelandair: { display: "Icelandair", color: "#043C84", code: "FI", alliance: undefined },
    IndiGo: { display: "IndiGo", color: "#3A469D", code: "6E", alliance: undefined },
    "IndiGo Airlines": { display: "IndiGo", color: "#3A469D", code: "6E", alliance: undefined },
    Indigo: { display: "IndiGo", color: "#3A469D", code: "6E", alliance: undefined },
    Interjet: { display: "InterJet", color: "#A8A8A8", code: "4O", alliance: undefined },
    InterJet: { display: "InterJet", color: "#A8A8A8", code: "4O", alliance: undefined },
    Japan: { display: "Japan Airlines", color: "#E56E69", code: "JL", alliance: "Oneworld" },
    "Japan Airlines": { display: "Japan Airlines", color: "#E56E69", code: "JL", alliance: "Oneworld" },
    Jeju: { display: "Jeju", color: "#F45424", code: "7C", alliance: "Value Alliance" },
    "Jeju Air": { display: "Jeju", color: "#F45424", code: "7C", alliance: "Value Alliance" },
    Jazeera: { display: "Jazeera Airways", color: "#1484C4", code: "J9", alliance: undefined },
    "Jazeera Airways": { display: "Jazeera Airways", color: "#1484C4", code: "J9", alliance: undefined },
    jet2: { display: "Jet2", color: "#e2231a", code: "LS", alliance: undefined },
    Jet2: { display: "Jet2", color: "#e2231a", code: "LS", alliance: undefined },
    jetBlue: { display: "jetBlue", color: "#5F90C8", code: "B6", alliance: undefined },
    JetBlue: { display: "jetBlue", color: "#5F90C8", code: "B6", alliance: undefined },
    "JetBlue Airways": { display: "jetBlue", color: "#5F90C8", code: "B6", alliance: undefined },
    Jetblue: { display: "jetBlue", color: "#5F90C8", code: "B6", alliance: undefined },
    "Jetblue Airways": { display: "jetBlue", color: "#5F90C8", code: "B6", alliance: undefined },
    Jetstar: { display: "Jetstar", color: "#FE5816", code: "JQ", alliance: undefined },
    JetStar: { display: "Jetstar", color: "#FE5816", code: "JQ", alliance: undefined },
    Jin: { display: "Jin Air", color: "#641C44", code: "LJ", alliance: undefined },
    "Jin Air": { display: "Jin Air", color: "#641C44", code: "LJ", alliance: undefined },
    JinAir: { display: "Jin Air", color: "#641C44", code: "LJ", alliance: undefined },
    JINAIR: { display: "Jin Air", color: "#641C44", code: "LJ", alliance: undefined },
    Kenya: { display: "Kenya", color: "#ec2227", code: "KQ", alliance: "SkyTeam" },
    "Kenya Airways": { display: "Kenya", color: "#ec2227", code: "KQ", alliance: "SkyTeam" },
    KLM: { display: "KLM", color: "#44A0DC", code: "KL", alliance: "SkyTeam" },
    "KLM Royal Dutch": { display: "KLM", color: "#44A0DC", code: "KL", alliance: "SkyTeam" },
    "KLM Royal Dutch Airlines": { display: "KLM", color: "#44A0DC", code: "KL", alliance: "SkyTeam" },
    "KLM-Royal Dutch Airlines": { display: "KLM", color: "#44A0DC", code: "KL", alliance: "SkyTeam" },
    Korean: { display: "Korean Air", color: "#154D9E", code: "KE", alliance: "SkyTeam" },
    "Korean Air": { display: "Korean Air", color: "#154D9E", code: "KE", alliance: "SkyTeam" },
    Kulula: { display: "Kulula", color: "#8CC43C", code: "MN", alliance: undefined },
    "La Compagnie": { display: "La Compagnie", color: "#94C4E4", code: "B0", alliance: undefined },
    "DreamJet SAS": { display: "La Compagnie", color: "#94C4E4", code: "B0", alliance: undefined },
    LATAM: { display: "LATAM Airlines", color: "#2A0087", code: "LA", alliance: "Star Alliance" },
    "LATAM Airlines": { display: "LATAM Airlines", color: "#2A0087", code: "LA", alliance: "Star Alliance" },
    "Lion Air": { display: "Lion", color: "#fb0102", code: "JT", alliance: undefined },
    "Lion Airlines": { display: "Lion", color: "#fb0102", code: "JT", alliance: undefined },
    LOT: { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    "LOT Airlines": { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    "LOT Polish": { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    "LOT Polish Airlines": { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    "Lot Airlines": { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    "Lot Polish": { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    "Lot Polish Airlines": { display: "LOT Polish", color: "#1A3171", code: "LO", alliance: "Star Alliance" },
    Lufthansa: { display: "Lufthansa", color: "#0A1D3D", code: "LH", alliance: "Star Alliance" },
    Luxair: { display: "Luxair", color: "#04ACBC", code: "LG", alliance: undefined },
    Malaysia: { display: "Malaysia", color: "#ED1C23", code: "MH", alliance: "Oneworld" },
    "Malaysia Airlines": { display: "Malaysia", color: "#ED1C23", code: "MH", alliance: "Oneworld" },
    Mango: { display: "Mango", color: "#EC7C1B", code: "JE", alliance: undefined },
    "Mango Airlines": { display: "Mango", color: "#EC7C1B", code: "JE", alliance: undefined },
    "Middle East": { display: "Middle East Airlines", color: "#047C5C", code: "ME", alliance: "SkyTeam" },
    "Middle East Airlines": { display: "Middle East Airlines", color: "#047C5C", code: "ME", alliance: "SkyTeam" },
    "Porter Airlines": { display: "Porter", color: "#0F2B53", code: "PD", alliance: undefined },
    Qantas: { display: "Qantas", color: "#E34538", code: "QF", alliance: "Oneworld" },
    "Qantas Airways": { display: "Qantas", color: "#E34538", code: "QF", alliance: undefined },
    Qatar: { display: "Qatar Airways", color: "#5C0632", code: "QR", alliance: "Oneworld" },
    "Qatar Airways": { display: "Qatar Airways", color: "#5C0632", code: "QR", alliance: "Oneworld" },
    Ryanair: { display: "Ryanair", color: "#f1c933", code: "FR", alliance: undefined },
    RyanAir: { display: "Ryanair", color: "#f1c933", code: "FR", alliance: undefined },
    SAS: { display: "Scandinavian", color: "#2B3087", code: "SK", alliance: "Star Alliance" },
    Scandinavian: { display: "Scandinavian", color: "#2B3087", code: "SK", alliance: "Star Alliance" },
    "Scandinavian Airlines": { display: "Scandinavian", color: "#2B3087", code: "SK", alliance: "Star Alliance" },
    Singapore: { display: "Singapore", color: "#EFA952", code: "SQ", alliance: "Star Alliance" },
    "Singapore Airlines": { display: "Singapore", color: "#EFA952", code: "SQ", alliance: "Star Alliance" },
    Southwest: { display: "WN", color: "#F6C04D", code: "WN", alliance: undefined },
    "Southwest Airlines": { display: "WN", color: "#F6C04D", code: "WN", alliance: undefined },
    WN: { display: "WN", color: "#F6C04D", code: "WN", alliance: undefined },
    Spirit: { display: "Spirit", color: "#BBB140", code: "NK", alliance: undefined },
    "Spirit Airlines": { display: "Spirit", color: "#BBB140", code: "NK", alliance: undefined },
    "Sun Country": { display: "Sun Country", color: "#D79A71", code: "SY", alliance: undefined },
    "Sun Country Airlines": { display: "Sun Country", color: "#D79A71", code: "SY", alliance: undefined },
    Swiss: { display: "Swiss", color: "#D42D21", code: "LX", alliance: "Star Alliance" },
    "Swiss International Air Lines": { display: "Swiss", color: "#D42D21", code: "LX", alliance: "Star Alliance" },
    SWISS: { display: "Swiss", color: "#D42D21", code: "LX", alliance: "Star Alliance" },
    TAP: { display: "TAP", color: "#CC2C34", code: "TP", alliance: "Star Alliance" },
    "TAP Air": { display: "TAP", color: "#CC2C34", code: "TP", alliance: "Star Alliance" },
    "TAP Air Portugal": { display: "TAP", color: "#CC2C34", code: "TP", alliance: "Star Alliance" },
    "TAP Portugal": { display: "TAP", color: "#CC2C34", code: "TP", alliance: "Star Alliance" },
    Turkish: { display: "Turkish", color: "#DB3832", code: "TK", alliance: "Star Alliance" },
    "Turkish Airlines": { display: "Turkish", color: "#DB3832", code: "TK", alliance: "Star Alliance" },
    United: { display: "United", color: "#235EA6", code: "UA", alliance: "Star Alliance" },
    "United Airlines": { display: "United", color: "#235EA6", code: "UA", alliance: "Star Alliance" },
    "Virgin Atlantic": { display: "Virgin Atlantic", color: "#AA1C2A", code: "VS", alliance: undefined },
    "Virgin Atlantic Airways": { display: "Virgin Atlantic", color: "#AA1C2A", code: "VS", alliance: undefined },
    Vistara: { display: "Vistara", color: "#47143D", code: "UK", alliance: undefined },
    WestJet: { display: "WestJet", color: "#4BA89C", code: "WS", alliance: undefined },
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
