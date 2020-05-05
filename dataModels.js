import airlinesMap from "./airlineMap.js";
import {
  getTimezoneOffset,
  convertTimeTo24HourClock,
  convertDurationToMinutes,
  getTimeDetails,
} from "./utilityFunctions.js";

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
function Flight(
  fromTime,
  toTime,
  operatingAirline,
  marketingAirline,
  duration,
  layovers
) {
  this.fromTime = fromTime;
  this.toTime = toTime;

  this.fromTimeDetails = getTimeDetails(fromTime);
  this.toTimeDetails = getTimeDetails(toTime);

  if (operatingAirline) {
    if (operatingAirline.includes("Partially operated by ")) {
      // regional airlines don't get the primary airline spot
      // they'll be displayed where we display marketing airlines
      this.operatingAirline = marketingAirline;
      this.marketingAirline = operatingAirline;
      this.marketingAirlineText = operatingAirline;
    } else {
      this.operatingAirline = operatingAirline;
      this.marketingAirline = marketingAirline;
      this.marketingAirlineText = `Marketed by ${marketingAirline}`;
    }
  } else {
    // operating and marketing are the same airline
    this.operatingAirline = marketingAirline;
    this.marketingAirline = marketingAirline;
  }

  this.operatingAirline = airlinesMap[this.operatingAirline] || {
    display: this.operatingAirline,
    color: "#DFCCFB",
  };

  // marketing airline is unique, not operating
  this.id = `${this.fromTime}-${this.toTime}-${marketingAirline}`;
  this.duration = duration;
  this.layovers = layovers || [];
  this.itinIds = [];
  this.timezoneOffset = this.calculateTimezoneOffset();
}

Flight.prototype.calculateTimezoneOffset = function () {
  let timezoneOffset = 0;

  if (!this.layovers.length) {
    timezoneOffset = getTimezoneOffset(
      this.fromTime,
      this.toTime,
      convertDurationToMinutes(this.duration)
    );
  } else {
    this.layovers.forEach(({ fromTime, toTime, duration }) => {
      let { hours: fromHr, minutes: fromMin } = convertTimeTo24HourClock(
        fromTime
      );

      let { hours: toHr, minutes: toMin } = convertTimeTo24HourClock(toTime);

      const endsNextDay = toTime.match(/(\+\d)/);
      const startsNextDay = fromTime.match(/(\+\d)/);
      let startDayOffset = 0;
      let endDayOffset = 0;

      if (endsNextDay) {
        const [_, endDays] = endsNextDay[0].split("+");
        endDayOffset += Number(endDays);
      }
      if (startsNextDay) {
        const [_, startDays] = startsNextDay[0].split("+");
        startDayOffset += Number(startDays);
        endDayOffset = startDayOffset;
      }

      const fromTotalMinutes = (fromHr + 24 * startDayOffset) * 60 + fromMin;
      const toTotalMinutes = (toHr + 24 * endDayOffset) * 60 + toMin;

      const durationMinutes = convertDurationToMinutes(duration);
      timezoneOffset += durationMinutes - (toTotalMinutes - fromTotalMinutes);
    });
  }
  return timezoneOffset;
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
    depFlight.operatingAirline,
    depFlight.marketingAirline,
    depFlight.duration,
    depFlight.layovers
  );
  if (retFlight) {
    this.retFlight = new Flight(
      retFlight.fromTime,
      retFlight.toTime,
      retFlight.operatingAirline,
      retFlight.marketingAirline,
      retFlight.duration,
      retFlight.layovers
    );
    this.id = `${this.depFlight.id}-${this.retFlight.id}`;
  } else {
    this.id = this.depFlight.id;
  }

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

    itins[itin.id] = itin;

    return itin;
  });

  return { itins, departures, returns };
}

export { makeItins, diffDepartures, findReturnFlights };
