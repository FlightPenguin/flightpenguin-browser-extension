/**
 * Flight {
 *  id: <fromTime-toTime-airline>,
 *  fromTime: "", YYYY-MM-DDTHH-MM // TODO standardize datetime
 *  toTime: "",
 *  duration: "",
 *  airline: "", // TODO change to list for multiple airlines (layovers) and marketing vs operating
 *  itinIds: [""],
 *  layovers: [Layover] // TODO
 * }
 * @param {string} fromTime
 * @param {string} toTime
 * @param {string} airline
 * @param {string} duration
 */
function Flight(fromTime, toTime, airline, duration) {
  this.fromTime = fromTime;
  this.toTime = toTime;
  this.airline = airline;

  this.id = `${this.fromTime}-${this.toTime}-${this.airline}`;
  this.duration = duration;
  this.layovers = [];
  this.itinIds = [];
}
// TODO
// Flight.prototype.addLayover = function(layover) {
//   // new Layover(layover)
//   this.layovers.push(layover);
// };
/**
 * Layover {
 *   from: "",
 *   to: "",
 *   fromTime: "",
 *   toTime: "",
 *   airline: "",
 *   duration: "",
 * }
 */

/**
 * @param {object} sentDepartures
 * @param {object} departures
 * @returns {array} list of departures
 */
function diffDepartures(sentDepartures, departures) {
  const idsToSend = new Set(Object.keys(departures));

  Object.keys(sentDepartures).forEach((sentId) => {
    idsToSend.delete(sentId);
  });
  return Array.from(idsToSend).map((id) => departures[id]);
}
/**
 * Itin {
 *   id: <dep_flight_id>-<ret_flight_id>,
 *   depFlight: Flight,
 *   retFlight: Flight,
 *   provider: "",
 *   tab_id: Number,
 *   window_id: Number,
 *   fare: ""
 * }
 * @param {object} depFlight
 * @param {object} retFlight
 * @param {number} fare
 * @param {string} currency
 * @param {string} provider
 * @param {number} windowId
 * @param {number} tabId
 */
function Itin(depFlight, retFlight, fare, currency, provider, windowId, tabId) {
  this.depFlight = new Flight(
    depFlight.fromTime,
    depFlight.toTime,
    depFlight.airline,
    depFlight.duration
  );
  this.retFlight = new Flight(
    retFlight.fromTime,
    retFlight.toTime,
    retFlight.airline,
    retFlight.duration
  );

  this.id = `${this.depFlight.id}-${this.retFlight.id}`;

  this.provider = provider;
  this.windowId = windowId;
  this.tabId = tabId;
  this.fare = fare;
  this.currency = currency;
}

function findReturnFlights(depFlight, itins) {
  return depFlight.itinIds.map((itinId) => itins[itinId].retFlight);
}

/**
 *
 * @param {array} itinCollection
 * @param {string} provider
 * @param {number} windowId
 * @param {number} tabId
 * @returns {object} {itins, departures, returns}
 */
function makeItins(itinCollection, provider, windowId, tabId) {
  const itins = {};
  const departures = {};
  const returns = {};

  itinCollection.forEach((ic) => {
    const itin = new Itin(
      ic.departureFlight,
      ic.returnFlight,
      ic.fare,
      ic.currency,
      provider,
      windowId,
      tabId
    );
    // the deduping flights part
    if (departures[itin.depFlight.id]) {
      // set flight to existing instance
      itin.depFlight = departures[itin.depFlight.id];
    } else {
      // add new flight
      departures[itin.depFlight.id] = itin.depFlight;
    }
    if (returns[itin.retFlight.id]) {
      // set flight to existing instance
      itin.retFlight = returns[itin.retFlight.id];
    } else {
      // add new flight
      returns[itin.retFlight.id] = itin.retFlight;
    }

    itin.depFlight.itinIds.push(itin.id);
    itin.retFlight.itinIds.push(itin.id);

    itins[itin.id] = itin;

    return itin;
  });

  return { itins, departures, returns };
}

export { makeItins, diffDepartures, findReturnFlights };
