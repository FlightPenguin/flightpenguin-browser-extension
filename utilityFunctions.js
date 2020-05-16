function convertTimeTo24HourClock(time, addDays) {
  let timeFormatted = time.toLowerCase();
  let [hours, minutesAndTimeOfDay] = timeFormatted.split(":");
  hours = Number(hours);
  let minutes = Number(
    minutesAndTimeOfDay.replace(/(pm)|(am)|(\+\d)/g, "").trim()
  );
  if (addDays) {
    const daysToAdd = time.match(/(\+\d)/);
    if (daysToAdd) {
      hours += daysToAdd[0].split("+")[1] * 24;
    }
  }

  if (timeFormatted.includes("pm") && hours % 12 !== 0) {
    hours += 12;
  } else if (timeFormatted.includes("am") && hours % 12 === 0) {
    hours -= 12;
  }
  return { hours, minutes };
}

function convert12HourTimeToMinutes(time) {
  const { hours, minutes } = convertTimeTo24HourClock(time, true);
  return hours * 60 + minutes;
}

function addTimezoneOffset(time, tzOffset) {
  const minutes = convert12HourTimeToMinutes(time);
  const newTimeInMinutes = minutes - tzOffset;
  return convertMinutesTo12HourClock(newTimeInMinutes, true);
}

function convertMinutesTo12HourClock(time, addDay) {
  const totalMinutes = Math.abs(time);
  const hours = Math.floor(totalMinutes / 60) % 24;

  const minutes = totalMinutes % 60;
  let minuteString = "" + minutes;
  minuteString = minuteString.padStart(2, "0");

  let timeString = "";
  if (hours < 12) {
    if (hours === 0) {
      timeString += "12";
    } else {
      timeString += hours;
    }
    timeString += `:${minuteString} AM`;
  } else {
    if (hours === 12) {
      timeString += 12;
    } else {
      timeString += `${hours - 12}`;
    }
    timeString += `:${minuteString} PM`;
  }

  if (addDay && totalMinutes / 60 > 24) {
    timeString += `+${Math.floor(totalMinutes / 60 / 24)}`;
  }

  return timeString;
}
function convertDurationToMinutes(duration) {
  // duration looks like 10h 30m
  let [durationHours, durationRest] = duration.split("h");
  let durationMinutes = durationRest.trim().split("m")[0] || 0;
  let durationTotalMinutes =
    Number(durationMinutes) + Number(durationHours) * 60;
  return durationTotalMinutes;
}
// calculate timezone offset in minutes
function getTimezoneOffset(fromTime, toTime, duration) {
  let { hours: fromHr, minutes: fromMin } = convertTimeTo24HourClock(fromTime);

  let { hours: toHr, minutes: toMin } = convertTimeTo24HourClock(toTime);

  const endsNextDay = toTime.match(/(\+\d)/);
  const startsNextDay = fromTime.match(/(\+\d)/);
  let startDayOffset = 0;
  let endDayOffset = 0;

  if (startsNextDay) {
    const [_, startDays] = startsNextDay[0].split("+");
    startDayOffset += Number(startDays);
    endDayOffset = startDayOffset;
  }
  if (endsNextDay) {
    const [_, endDays] = endsNextDay[0].split("+");
    endDayOffset += Number(endDays);
  }

  const fromTotalMinutes = (fromHr + 24 * startDayOffset) * 60 + fromMin;
  const toTotalMinutes = (toHr + 24 * endDayOffset) * 60 + toMin;

  const durationMinutes = convertDurationToMinutes(duration);

  return durationMinutes - (toTotalMinutes - fromTotalMinutes);
}

function getTimeDetails(time) {
  const { hours, minutes } = convertTimeTo24HourClock(time, true);
  const timeOfDay = time.toLowerCase().match(/(pm)|(am)/)[0];
  const excessDays = time.match(/(\+\d)/);
  const displayHours = Number(time.split(":")[0]); // want 12 hour clock

  return {
    hours,
    displayHours,
    minutes,
    timeOfDay,
    excessDays: excessDays ? excessDays[0] : excessDays,
  };
}

function nearestFactorOf24(number) {
  const factorsOf24 = [1, 2, 3, 4, 6, 8, 12];

  if (factorsOf24.includes(number)) {
    return number;
  }

  const sorted = [...factorsOf24, number].sort((a, b) => a - b);
  const idx = sorted.indexOf(number);
  if (idx === sorted.length - 1) {
    return number;
  } else {
    return sorted[idx + 1];
  }
}
/**
 * Want Midnight 12 AM to be an interval.
 * @param {Number} startHourOffset
 */
function findBestStartHourOffset(startHourOffset) {
  const possibleOffsets = [0, 6, 12, startHourOffset].sort((a, b) => a - b);
  const startIdx = possibleOffsets.indexOf(startHourOffset);
  if (startIdx === 0) {
    return possibleOffsets[1];
  } else if (startIdx === possibleOffsets.length - 1) {
    return possibleOffsets[possibleOffsets.length - 2];
  } else if (
    startHourOffset - possibleOffsets[startIdx - 1] <
    possibleOffsets[startIdx + 1] - startHourOffset
  ) {
    return possibleOffsets[startIdx - 1];
  } else {
    return possibleOffsets[startIdx + 1];
  }
}

export {
  convertTimeTo24HourClock,
  convertMinutesTo12HourClock,
  convert12HourTimeToMinutes,
  getTimezoneOffset,
  convertDurationToMinutes,
  getTimeDetails,
  addTimezoneOffset,
  nearestFactorOf24,
  findBestStartHourOffset,
};
