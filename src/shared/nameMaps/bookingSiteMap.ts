export interface BookingPartnerLookup {
  name: string;
  isFirstParty: boolean;
}

const AIRLINE_REGEX = /\s+(?:Airlines?|Air ?ways?|Express|Limited)\s*/gi;
const STARTS_WITH_AIR_REGEX = /^air\s+/i;
const ENDS_WITH_TRIMMER_REGEX = /\s+(?:air|sas|ltd\.?)\s*$/i;

const AEROLINEAS = { name: "Aerolineas", isFirstParty: true };
const AEROMEXICO = { name: "Aeromexico", isFirstParty: true };
const AIRASIA = { name: "AirAsia", isFirstParty: true };
const AIR_BALTIC = { name: "Air Baltic", isFirstParty: true };
const AIRLINK = { name: "Airlink", isFirstParty: true };
const ALLEGIANT = { name: "Allegiant", isFirstParty: true };
const ANA = { name: "ANA", isFirstParty: true };
const ASIANA = { name: "Asiana", isFirstParty: true };
const AVIANCA = { name: "Avianca", isFirstParty: true };
const AZUL = { name: "Azul Brazilian", isFirstParty: true };
const BOOKING_DOT_COM = { name: "Booking.com", isFirstParty: false };
const CATHAY_PACIFIC = { name: "Cathay Pacific", isFirstParty: true };
const CEBU_PACIFIC = { name: "Cebu Pacific", isFirstParty: true };
const CEM_AIR = { name: "CemAir", isFirstParty: true };
const CZECH = { name: "Czech", isFirstParty: true };
const EASYJET = { name: "easyJet", isFirstParty: true };
const EGYPTAIR = { name: "Egyptair", isFirstParty: true };
const GARUDA = { name: "Garuda Indonesia", isFirstParty: true };
const GATE1_DOT_CO_DOT_UK = { name: "Gate1.co.uk", isFirstParty: false };
const GOL = { name: "GOL", isFirstParty: true };
const ITA_AIRWAYS = { name: "ITA Airways", isFirstParty: true };
const JINAIR = { name: "Jin Air", isFirstParty: true };
const KISSANDFLY_DOT_COM = { name: "Kissandfly.com", isFirstParty: false };
const KIWI_DOT_COM = { name: "Kiwi.com", isFirstParty: false };
const KLM = { name: "KLM", isFirstParty: true };
const LA_COMPAGNIE = { name: "La Compagnie", isFirstParty: true };
const LAST_MINUTE_DOT_COM = { name: "lastminute.com", isFirstParty: false };
const LOT = { name: "LOT Polish Airlines", isFirstParty: true };
const MYTRIP_DOT_COM = { name: "mytrip.com", isFirstParty: false };
const NORWEGIAN = { name: "Norwegian", isFirstParty: true };
const PAKISTAN = { name: "PIA", isFirstParty: true };
const PEACH = { name: "Peach", isFirstParty: true };
const PHILIPPINE = { name: "Philippine", isFirstParty: true };
const RAM = { name: "Royal Air Maroc", isFirstParty: true };
const REX = { name: "Rex", isFirstParty: true };
const SAFAIR = { name: "Safair", isFirstParty: true };
const SAUDIA = { name: "Saudia", isFirstParty: true };
const SCANDANAVIAN = { name: "Scandinavian", isFirstParty: true };
const SOUTHWEST = { name: "WN", isFirstParty: true };
const SRI_LANKAN = { name: "SriLankan Airlines", isFirstParty: true };
const STUDENT_UNIVERSE = { name: "StudentUniverse", isFirstParty: false };
const SWISS = { name: "Swiss", isFirstParty: true };
const TAAG = { name: "TAAG", isFirstParty: true };
const TAP_AIR_PORTUGAL = { name: "TAP Air Portugal", isFirstParty: true };
const TRIP_DOT_COM = { name: "Trip.com", isFirstParty: false };
const VUELING = { name: "Vueling", isFirstParty: true };

export class BookingSiteMap {
  private map: { [keyof: string]: BookingPartnerLookup };

  constructor() {
    this.map = {
      ana: ANA,
      "all nippon": ANA,
      adria: { name: "Adria", isFirstParty: true },
      aegean: { name: "Aegean", isFirstParty: true },
      "air lingus": { name: "Aer Lingus", isFirstParty: true },
      aeroflot: { name: "Aeroflot", isFirstParty: true },
      aerolineas: AEROLINEAS,
      "aerolineas argentinas": AEROLINEAS,
      aeroméxico: AEROMEXICO,
      aeromexico: AEROMEXICO,
      airasia: AIRASIA,
      "air asia": AIRASIA,
      aircalin: { name: "Aircalin", isFirstParty: true },
      "air arabia": { name: "Air Arabia", isFirstParty: true },
      "air astana": { name: "Air Astana", isFirstParty: true },
      "air austral": { name: "Air Austral", isFirstParty: true },
      "air baltic": AIR_BALTIC,
      airbaltic: AIR_BALTIC,
      "air belgium": { name: "Air Belgium", isFirstParty: true },
      "air canada": { name: "Air Canada", isFirstParty: true },
      "air caraibes": { name: "Air Caraibes", isFirstParty: true },
      "air china": { name: "Air China", isFirstParty: true },
      "air corsica": { name: "Air Corsica", isFirstParty: true },
      "air dolomiti": { name: "Air Dolomiti", isFirstParty: true },
      "air europa": { name: "Air Europa", isFirstParty: true },
      "air france": { name: "Air France", isFirstParty: true },
      "air india": { name: "Air India", isFirstParty: true },
      "air macau": { name: "Air Macau", isFirstParty: true },
      "air madagascar": { name: "Air Madagascar", isFirstParty: true },
      "air malta": { name: "Air Malta", isFirstParty: true },
      "air mauritius": { name: "Air Mauritius", isFirstParty: true },
      "air namibia": { name: "Air Namibia", isFirstParty: true },
      "air new zealand": { name: "Air New Zealand", isFirstParty: true },
      "air north": { name: "Air North", isFirstParty: true },
      "air seoul": { name: "Air Seoul", isFirstParty: true },
      "air serbia": { name: "Air Serbia", isFirstParty: true },
      "air seychelles": { name: "Air Seychelles", isFirstParty: true },
      "air tahiti nui": { name: "Air Tahiti Nui", isFirstParty: true },
      "air transat": { name: "Air Transat", isFirstParty: true },
      "air vanuatu": { name: "Air Vanuatu", isFirstParty: true },
      "air vistara": { name: "Vistara", isFirstParty: true },
      airlink: AIRLINK,
      alaska: { name: "Alaska", isFirstParty: true },
      alitilia: ITA_AIRWAYS,
      allegiant: ALLEGIANT,
      american: { name: "American Airlines", isFirstParty: true },
      asky: { name: "ASKY", isFirstParty: true },
      austrian: { name: "Austrian", isFirstParty: true },
      asiana: ASIANA,
      Avianca: AVIANCA,
      booking: BOOKING_DOT_COM,
      "booking.com": BOOKING_DOT_COM,
      azerbaijan: { name: "Azerbaijan", isFirstParty: true },
      azul: AZUL,
      "azul linhas aereas brasileiras": AZUL,
      bamboo: { name: "Bamboo", isFirstParty: true },
      bangkok: { name: "Bangkok Airways", isFirstParty: true },
      bravofly: { name: "BravoFly", isFirstParty: false },
      breeze: { name: "Breeze", isFirstParty: true },
      british: { name: "British Airways", isFirstParty: true },
      brussels: { name: "Brussels Airways", isFirstParty: true },
      carribean: { name: "Carribean", isFirstParty: true },
      "cathay dragon": { name: "Cathay Dragon", isFirstParty: true },
      cathay: CATHAY_PACIFIC,
      "cathay pacific": CATHAY_PACIFIC,
      cayman: { name: "Cayman Airways", isFirstParty: true },
      cebu: CEBU_PACIFIC,
      "cebu pacific": CEBU_PACIFIC,
      cemair: CEM_AIR,
      cem: CEM_AIR,
      chatdeal: { name: "ChatDeal", isFirstParty: false },
      cheapticketsdeal: { name: "CheapTicketsDeal", isFirstParty: false },
      cheapbestfares: { name: "CheapBestFares", isFirstParty: false },
      cheapoair: { name: "CheapOair", isFirstParty: false },
      china: { name: "China Airlines", isFirstParty: true },
      "china eastern": { name: "China Eastern", isFirstParty: true },
      "china southern": { name: "China Southern", isFirstParty: true },
      condor: { name: "Condor", isFirstParty: true },
      copa: { name: "Copa", isFirstParty: true },
      croatia: { name: "Croatia Airlines", isFirstParty: true },
      csa: CZECH,
      czech: CZECH,
      delta: { name: "Delta", isFirstParty: true },
      dreamjet: LA_COMPAGNIE,
      dreamworldtravel: { name: "DreamWorldTravel", isFirstParty: false },
      easyjet: EASYJET,
      "easyjet europe": EASYJET,
      edelweiss: { name: "Edelweiss", isFirstParty: true },
      egypt: EGYPTAIR,
      egyptair: EGYPTAIR,
      "el al": { name: "El Al", isFirstParty: true },
      emirates: { name: "Emirates", isFirstParty: true },
      enuygen: { name: "Enuygen", isFirstParty: false },
      ethiopian: { name: "Ethiopian", isFirstParty: true },
      etihad: { name: "Etihad Airways", isFirstParty: true },
      eurowings: { name: "Eurowings", isFirstParty: true },
      eva: { name: "EVA", isFirstParty: true },
      edreams: { name: "eDreams", isFirstParty: false },
      expedia: { name: "Expedia", isFirstParty: false },
      farebubble: { name: "FareBubble", isFirstParty: false },
      fiji: { name: "Fiji Airways", isFirstParty: true },
      finnair: { name: "Finnair", isFirstParty: true },
      flighthub: { name: "FlightHub", isFirstParty: false },
      "flights by su": STUDENT_UNIVERSE,
      flydubai: { name: "flydubai", isFirstParty: true },
      flyone: { name: "FlyOne", isFirstParty: true },
      flysafair: { name: "Safair", isFirstParty: true },
      "french bee": { name: "French Bee", isFirstParty: true },
      frontier: { name: "Frontier", isFirstParty: true },
      gate1: GATE1_DOT_CO_DOT_UK,
      "gate1.co.uk": GATE1_DOT_CO_DOT_UK,
      garuda: GARUDA,
      "garuda indonesia": GARUDA,
      globehunters: { name: "Globehunters", isFirstParty: false },
      gol: GOL,
      "gol linhas aereas inteligentes": GOL,
      gotogate: { name: "Gotogate", isFirstParty: false },
      gulf: { name: "Gulf Air", isFirstParty: true },
      gurufare: { name: "Gurufare", isFirstParty: false },
      hainan: { name: "Hainan", isFirstParty: true },
      hawaiian: { name: "Hawaiian", isFirstParty: true },
      helvetic: { name: "Helvetic", isFirstParty: true },
      "hong kong": { name: "Hong Kong Airlines", isFirstParty: true },
      icelandair: { name: "Icelandair", isFirstParty: true },
      indigGo: { name: "IndiGo", isFirstParty: true },
      interjet: { name: "InterJet", isFirstParty: true },
      iberia: { name: "Iberia", isFirstParty: true },
      ita: ITA_AIRWAYS,
      "ita - italia trasporto aereo": ITA_AIRWAYS,
      japan: { name: "Japan Airlines", isFirstParty: true },
      jeju: { name: "Jeju", isFirstParty: true },
      jazeera: { name: "Jazeera Airways", isFirstParty: true },
      jet2: { name: "Jet2", isFirstParty: true },
      jetBlue: { name: "jetBlue", isFirstParty: true },
      jetstar: { name: "Jetstar", isFirstParty: true },
      jin: JINAIR,
      jinair: JINAIR,
      justfly: { name: "JustFly", isFirstParty: false },
      kayak: { name: "KAYAK", isFirstParty: false },
      kenya: { name: "Kenya", isFirstParty: true },
      "kissandfly.com": KISSANDFLY_DOT_COM,
      kiwi: KIWI_DOT_COM,
      "kiwi.com": KIWI_DOT_COM,
      klm: KLM,
      "klm royal dutch": KLM,
      kombo: { name: "Kombo", isFirstParty: false },
      korean: { name: "Korean Air", isFirstParty: true },
      kulula: { name: "Kulula", isFirstParty: true },
      "la compagnie": LA_COMPAGNIE,
      lastminute: LAST_MINUTE_DOT_COM,
      "lastminute.com": LAST_MINUTE_DOT_COM,
      latam: { name: "LATAM Airlines", isFirstParty: true },
      lion: { name: "Lion", isFirstParty: true },
      lot: LOT,
      "lot polish": LOT,
      lufthansa: { name: "Lufthansa", isFirstParty: true },
      luxair: { name: "Luxair", isFirstParty: true },
      malaysia: { name: "Malaysia", isFirstParty: true },
      mango: { name: "Mango", isFirstParty: true },
      "middle east": { name: "Middle East Airlines", isFirstParty: true },
      momondo: { name: "Momondo", isFirstParty: false },
      mytrip: MYTRIP_DOT_COM,
      "mytrip.com": MYTRIP_DOT_COM,
      netflights: { name: "Netflights", isFirstParty: false },
      nok: { name: "Nok Air", isFirstParty: true },
      nordwind: { name: "Nordwind", isFirstParty: true },
      norwegian: NORWEGIAN,
      "norwegian international": NORWEGIAN,
      "norwegian air international": NORWEGIAN,
      "norwegian air shuttle": NORWEGIAN,
      "norwegian air sweden": NORWEGIAN,
      "norwegian air uk": NORWEGIAN,
      oman: { name: "Oman Air", isFirstParty: true },
      opodo: { name: "Opodo", isFirstParty: false },
      orbitz: { name: "Orbitz", isFirstParty: false },
      "pakistan international": PAKISTAN,
      pal: PHILIPPINE,
      peach: PEACH,
      "peach aviation": PEACH,
      pegasus: { name: "Pegasus", isFirstParty: true },
      philippine: PHILIPPINE,
      pia: PAKISTAN,
      porter: { name: "Porter", isFirstParty: true },
      priceline: { name: "Priceline", isFirstParty: false },
      qantas: { name: "Qantas", isFirstParty: true },
      qatar: { name: "Qatar Airways", isFirstParty: true },
      ram: RAM,
      rex: REX,
      regional: REX,
      rossiya: { name: "Rossiya", isFirstParty: true },
      "royal air maroc": RAM,
      "royal brunei": { name: "Royal Brunei", isFirstParty: true },
      "royal jordanian": { name: "Royal Jordanian", isFirstParty: true },
      rwandair: { name: "RwandAir", isFirstParty: true },
      ryanair: { name: "Ryanair", isFirstParty: true },
      s7: { name: "S7", isFirstParty: true },
      safair: SAFAIR,
      siberia: { name: "S7", isFirstParty: true },
      saudia: SAUDIA,
      "saudi arabian": SAUDIA,
      sas: SCANDANAVIAN,
      scandinavian: SCANDANAVIAN,
      scoot: { name: "Scoot", isFirstParty: true },
      shanghai: { name: "Shanghai", isFirstParty: true },
      shenzen: { name: "Shenzen", isFirstParty: true },
      singapore: { name: "Singapore", isFirstParty: true },
      silver: { name: "Silver", isFirstParty: true },
      smartfares: { name: "SmartFares", isFirstParty: false },
      "south african": { name: "South African", isFirstParty: true },
      "south african airlink": AIRLINK,
      southwest: SOUTHWEST,
      spicejet: { name: "SpiceJet", isFirstParty: true },
      spirit: { name: "Spirit", isFirstParty: true },
      spring: { name: "Spring Airlines", isFirstParty: true },
      srilankan: SRI_LANKAN,
      "sri lankan": SRI_LANKAN,
      studentuniverse: STUDENT_UNIVERSE,
      "sun country": { name: "Sun Country", isFirstParty: true },
      sunwing: { name: "Sunwing", isFirstParty: true },
      swiss: SWISS,
      "swiss international": SWISS,
      swoop: { name: "Swoop", isFirstParty: true },
      taag: TAAG,
      "taag angola": TAAG,
      taca: AVIANCA,
      tap: TAP_AIR_PORTUGAL,
      "tap air": TAP_AIR_PORTUGAL,
      "tap air portugal": TAP_AIR_PORTUGAL,
      "tap portugal": TAP_AIR_PORTUGAL,
      tarom: { name: "TAROM", isFirstParty: true },
      thai: { name: "Thai Airways", isFirstParty: true },
      transavia: { name: "Transavia", isFirstParty: true },
      travel2be: { name: "Travel2Be", isFirstParty: false },
      travelgenio: { name: "Travelgenio", isFirstParty: false },
      traveljunction: { name: "TravelJunction", isFirstParty: false },
      travelocity: { name: "Travelocity", isFirstParty: false },
      trip: TRIP_DOT_COM,
      "trip.com": TRIP_DOT_COM,
      tripmonster: { name: "Tripmonster", isFirstParty: false },
      tui: { name: "TUI", isFirstParty: true },
      tunisair: { name: "Tunisair", isFirstParty: true },
      turkish: { name: "Turkish", isFirstParty: true },
      united: { name: "United Airlines", isFirstParty: true },
      ural: { name: "Ural", isFirstParty: true },
      utair: { name: "Utair", isFirstParty: true },
      uzbekistan: { name: "Uzbekistan", isFirstParty: true },
      vietnam: { name: "Vietnam", isFirstParty: true },
      "virgin atlantic": { name: "Virgin Atlantic", isFirstParty: true },
      "virgin australia": { name: "Virgin Australia", isFirstParty: true },
      vistara: { name: "Vistara", isFirstParty: true },
      "viva aerobus": { name: "Viva Aerobus", isFirstParty: true },
      volaris: { name: "Volaris", isFirstParty: true },
      volotea: { name: "Volotea", isFirstParty: true },
      vueling: VUELING,
      "vueling global": VUELING,
      westJet: { name: "WestJet", isFirstParty: true },
      "wideroes flyveselskap": { name: "Widerøe", isFirstParty: true },
      wizz: { name: "Wizz Air", isFirstParty: true },
      xiamen: { name: "Xiamen", isFirstParty: true },
    };
  }

  getMatch(input: string): BookingPartnerLookup {
    const clean = input.trim().replace(AIRLINE_REGEX, " ").trim().replace(ENDS_WITH_TRIMMER_REGEX, "").trim();
    const mappedValue = this.map[clean.toLowerCase()];
    return mappedValue || { name: clean, isFirstParty: AIRLINE_REGEX.test(input) || STARTS_WITH_AIR_REGEX.test(input) };
  }
}
