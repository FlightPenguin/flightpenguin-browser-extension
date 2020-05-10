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
  const hours = Math.floor(time / 60) % 24;

  const minutes = time % 60;
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

  if (addDay && time / 60 > 24) {
    timeString += "+1";
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
  let { hours, minutes } = convertTimeTo24HourClock(time);
  const timeOfDay = time.toLowerCase().match(/(pm)|(am)/)[0];
  const excessDays = time.match(/(\+\d)/);
  const isDayTime = hours <= 18 && hours >= 6;
  hours = Number(time.split(":")[0]); // want 12 hour clock

  return {
    hours,
    minutes,
    timeOfDay,
    excessDays: excessDays ? excessDays[0] : excessDays,
    isDayTime,
  };
}

export {
  convertTimeTo24HourClock,
  convertMinutesTo12HourClock,
  convert12HourTimeToMinutes,
  getTimezoneOffset,
  convertDurationToMinutes,
  getTimeDetails,
  addTimezoneOffset,
};
