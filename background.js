// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage
chrome.runtime.onInstalled.addListener(function() {
  console.log("Is this thing on?");
});

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  /**
    from: "sfo"
    to: "lax"
    southwest: false
    priceline: true
    cabin: "Economy"
    fromDate: "2020-03-24"
    toDate: "2020-03-25"
    numPax: 2
     */
  console.log("formData", message);
  const { southwest, priceline } = message;
  const providers = [];
  if (southwest) {
    providers.push("southwest");
  }
  if (priceline) {
    providers.push("priceline");
  }
  let tabIds = [];
  providers.forEach(provider => {
    const url = providerURLBaseMap[provider](message);
    console.log(url);
    // open new tab with url
    chrome.tabs.create({ url }, tab => {
      tabIds.push(tab.id);
    });
  });
});

const providerURLBaseMap = {
  priceline: pricelineTabURL,
  southwest: southwestTabURL
};
const priceline_cabin_map = {
  econ: "ECO", // to get Basic Econ, set requestBasicEconomy to "true" in request body
  prem_econ: "PEC",
  business: "BUS",
  first: "FST"
};
function southwestTabURL(formData) {
  const { from, to, fromDate, toDate, numPax } = formData;
  // sub in search args
  let newFrom = from.toUpperCase();
  switch (from) {
    case "SFO":
      newFrom = "OAK";
      break;
    default:
      break;
  }
  return `https://www.southwest.com/air/booking/select.html?adultPassengersCount=${numPax}&departureDate=${fromDate}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${to}&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=${from}&passengerType=ADULT&reset=true&returnDate=${toDate}&returnTimeOfDay=ALL_DAY&seniorPassengersCount=0&tripType=roundtrip`;
}
function pricelineTabURL(formData) {
  const { from, to, fromDate, toDate, numPax, cabin } = formData;
  return `https://www.priceline.com/m/fly/search/${from}-${to}-${fromDate.replace(
    /-/g,
    ""
  )}/${to}-${from}-${toDate.replace(/-/g, "")}/?cabin-class=${
    priceline_cabin_map[cabin]
  }&num-adults=${numPax}`;
}
