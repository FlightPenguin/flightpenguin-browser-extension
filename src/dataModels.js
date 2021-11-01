import { getCalculatedDuration } from "shared/utilities/getCalculatedDuration";
import { getPain } from "shared/utilities/pain/getPain";

import AirlineMap from "./shared/nameMaps/airlineMap.js";
import isRegionalAirline from "./shared/nameMaps/regionalAirlines.js";
import { convertDurationToMinutes, getTimeDetails, getTimezoneOffset } from "./utilityFunctions.js";

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
 * @param {FlightTimeDetails} fromTimeDetails
 * @param {Date} fromDateTime
 * @param {string} fromLocalTime
 * @param {string} toTime
 * @param {FlightTimeDetails} toTimeDetails
 * @param {Date} toDateTime
 * @param {string} toLocalTime
 * @param {string} operatingAirline
 * @param {string} marketingAirline
 * @param {string} duration
 * @param {Object[]} layovers
 * @param {number} timezoneOffset
 */
function Flight(
  fromTime,
  fromTimeDetails,
  fromDateTime,
  fromLocalTime,
  toTime,
  toTimeDetails,
  toDateTime,
  toLocalTime,
  operatingAirline,
  marketingAirline,
  duration,
  layovers,
  timezoneOffset,
) {
  this.fromTime = fromTime;
  this.toTime = toTime;

  this.fromTimeDetails = fromTimeDetails;
  this.toTimeDetails = toTimeDetails;

  this.fromDateTime = fromDateTime;
  this.toDateTime = toDateTime;

  this.fromLocalTime = fromLocalTime;
  this.toLocalTime = toLocalTime;

  let opAirline = operatingAirline
    ? operatingAirline.replace("Operated by", "").replace("Partially operated by", "")
    : operatingAirline;
  opAirline = AirlineMap.getAirlineName(opAirline);
  const markAirline = AirlineMap.getAirlineName(marketingAirline);

  // operating airline is what is primarily displayed
  // marketing airline is used to create the id
  if (opAirline) {
    const isPartiallyOperated = operatingAirline.includes("Partially operated by");
    if (isRegionalAirline(opAirline) || isPartiallyOperated) {
      // regional airlines don't get the primary airline spot
      // they'll be displayed where we display marketing airlines
      this.operatingAirline = markAirline;
      if (isPartiallyOperated) {
        this.marketingAirlineText = operatingAirline;
      } else {
        this.marketingAirlineText = `Operated by ${opAirline}`;
      }
    } else {
      this.operatingAirline = opAirline;
      this.marketingAirlineText = `Marketed by ${markAirline}`;
    }
  } else {
    // operating and marketing are the same airline
    this.operatingAirline = markAirline;
  }
  this.operatingAirline = cleanupAirline(this.operatingAirline);

  // marketing airline is unique, not operating
  this.id = `${this.fromLocalTime}-${this.toLocalTime}-${markAirline}`;
  this.duration = duration;
  this.durationMinutes = convertDurationToMinutes(duration);
  this.layovers = layovers || [];
  this.itinIds = [];
  this.timezoneOffset = timezoneOffset;

  this.updateLayovers();
}

function cleanupAirline(airline) {
  let justAirlines = [airline];
  if (airline.includes("Partially operated by")) {
    justAirlines = airline.split("Partially operated by ");
  } else if (airline.includes("Operated by")) {
    justAirlines = airline.split("Operated by");
  }
  const justAirline = justAirlines[justAirlines.length - 1].trim();
  const airlines = justAirline.split(" + ");

  let shortAirlineName;
  if (airlines.length === 1) {
    shortAirlineName = airlines[0];
  } else {
    shortAirlineName = airlines.map((airline) => AirlineMap.getAirlineName(airline.replace("  ", " "))).join(", ");
  }

  return AirlineMap.getAirlineDetails(shortAirlineName.replace("  ", " "));
}

Flight.prototype.updateLayovers = function () {
  if (this.layovers.length) {
    const layovers = this.layovers.map(({ fromTime, toTime, duration, operatingAirline, timezoneOffset }, idx) => {
      return {
        ...this.layovers[idx],
        fromTimeDetails: getTimeDetails(fromTime),
        toTimeDetails: getTimeDetails(toTime),
        duration: duration,
        operatingAirline: cleanupAirline(operatingAirline),
        timezoneOffset: timezoneOffset,
        isLayoverStop: false,
      };
    });
    const layoversWithStops = [];
    for (let i = 0; i < layovers.length - 1; i++) {
      const previousFlight = layovers[i];
      const nextFlight = layovers[i + 1];
      let { toTime: fromTime, to: from, toLocalTime: fromLocalTime, toTimeDetails: fromTimeDetails } = previousFlight;
      let { fromTime: toTime, from: to, fromLocalTime: toLocalTime, fromTimeDetails: toTimeDetails } = nextFlight;
      const { durationInMinutes, duration } = getCalculatedDuration(fromTimeDetails, toTimeDetails);

      layoversWithStops.push(previousFlight);
      layoversWithStops.push({
        fromTime,
        fromTimeDetails,
        fromLocalTime,
        toTime,
        toTimeDetails,
        toLocalTime,
        duration,
        durationInMinutes,
        from,
        to,
        timezoneOffset: 0,
        isLayoverStop: true,
        operatingAirline: {
          display: `Layover at ${from}.`,
          color: "transparent",
        },
      });
    }
    layoversWithStops.push(layovers[layovers.length - 1]);
    this.layovers = layoversWithStops;
  }
};
// TODO
// Flight.prototype.addLayover = function(layover) {
//   // new Layover(layover)
//   this.layovers.push(layover);
// };
/**
 * Layover {
 *   from: "",
 *   to: "",
 *   duration: "",
 *   fromTime: "",
 *   toTime: "",
 *   airline: "",
 *   duration: "",
 * }
 */

/**
 * @param {object} flights
 * @param {object} itins
 * @param {string}: cabin
 * @returns {array} list of departures
 */
function sortFlights(flights, itins, cabin) {
  for (let [k, v] of Object.entries(flights)) {
    const price = itins[v.itinIds.sort((a, b) => itins[a].fareNumber - itins[b].fareNumber)[0]].fareNumber;
    v.pain = getPain(price, cabin, v.layovers);
  }

  return Object.values(flights).sort((a, b) => a.pain - b.pain);
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
function Itin(depFlight, retFlight, fare, currency, provider, windowId, tabId, makeRetFlightOnly) {
  if (makeRetFlightOnly) {
    this.depFlight = depFlight;
  } else {
    this.depFlight = new Flight(
      depFlight.fromTime,
      depFlight.fromTimeDetails,
      depFlight.fromDateTime,
      depFlight.fromLocalTime,
      depFlight.toTime,
      depFlight.toTimeDetails,
      depFlight.toDateTime,
      depFlight.toLocalTime,
      depFlight.operatingAirline,
      depFlight.marketingAirline,
      depFlight.duration,
      depFlight.layovers,
      depFlight.timezoneOffset,
    );
  }

  if (retFlight) {
    this.retFlight = new Flight(
      retFlight.fromTime,
      retFlight.fromTimeDetails,
      retFlight.fromDateTime,
      retFlight.fromLocalTime,
      retFlight.toTime,
      retFlight.toTimeDetails,
      retFlight.toDateTime,
      retFlight.toLocalTime,
      retFlight.operatingAirline,
      retFlight.marketingAirline,
      retFlight.duration,
      retFlight.layovers,
      retFlight.timezoneOffset,
    );
    this.id = `${this.depFlight.id}-${this.retFlight.id}`;
  } else {
    this.id = this.depFlight.id;
  }

  this.provider = provider;
  this.windowId = windowId;
  this.tabId = tabId;
  // String interpolate to make sure we're dealing with a string
  this.fareNumber = Number(`${fare}`.match(/\d+/g).join(""));
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
function makeItins(itinCollection, departures, itins, provider, windowId, tabId, makeRetFlightOnly = false) {
  const returns = {};

  itinCollection.forEach((ic) => {
    const itin = new Itin(
      ic.departureFlight,
      ic.returnFlight,
      ic.fare,
      ic.currency,
      provider,
      windowId,
      tabId,
      makeRetFlightOnly,
    );

    // the deduping flights part
    if (departures[itin.depFlight.id]) {
      // set flight to existing instance
      // depFlight is just a Flight, not an itin, so this is okay
      itin.depFlight = departures[itin.depFlight.id];
    } else {
      // add new flight
      departures[itin.depFlight.id] = itin.depFlight;
    }
    if (itin.retFlight) {
      if (returns[itin.retFlight.id]) {
        // set flight to existing instance
        itin.retFlight = returns[itin.retFlight.id];
      } else {
        // add new flight
        returns[itin.retFlight.id] = itin.retFlight;
      }

      itin.retFlight.itinIds.push(itin.id);
    }

    itin.depFlight.itinIds.push(itin.id);

    // if (itins[itin.id]) {
    //   // this can happen if the same itin exists across different providers
    //   itins[itin.id].push(itin);
    // } else {
    //   itins[itin.id] = [itin];
    // }
    itins[itin.id] = itin;
  });

  return { itins, departures, returns };
}

export { makeItins, sortFlights, findReturnFlights };
