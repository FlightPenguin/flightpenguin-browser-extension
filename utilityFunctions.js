function convertTimeTo24HourClock(time) {
  let timeFormatted = time.toLowerCase();
  let [hours, minutesAndTimeOfDay] = timeFormatted.split(":");
  hours = Number(hours);
  let minutes = Number(
    minutesAndTimeOfDay.replace(/(pm)|(am)|(\+\d)/g, "").trim()
  );

  if (timeFormatted.includes("pm") && hours !== 12) {
    hours += 12;
  } else if (timeFormatted.includes("am") && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
}

function convert12HourTimeToMinutes(time) {
  const { hours, minutes } = convertTimeTo24HourClock(time);
  return hours * 60 + minutes;
}

function convertMinutesTo12HourClock(time) {
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

  return timeString;
}
function convertDurationToMinutes(duration) {
  // duration looks like 10h 30m
  let [durationHours, durationRest] = duration.split("h");
  let durationMinutes = durationRest.trim().split("m")[0];
  let durationTotalMinutes =
    Number(durationMinutes) + Number(durationHours) * 60;
  return durationTotalMinutes;
}
// calculate timezone offset in minutes
function getTimezoneOffset(fromTime, toTime, duration) {
  let { hours: toHours, minutes: toMinutes } = convertTimeTo24HourClock(toTime);
  let { hours: fromHours, minutes: fromMinutes } = convertTimeTo24HourClock(
    fromTime
  );
  let toTotalMinutes = toMinutes + toHours * 60;
  const daysToAdd = toTime.match(/(\+\d)/);
  if (daysToAdd) {
    toTotalMinutes += daysToAdd[0].split("+")[1] * 24 * 60;
  }
  let fromTotalMinutes = fromMinutes + fromHours * 60;

  let timezoneOffset = duration - (toTotalMinutes - fromTotalMinutes);

  return timezoneOffset;
}

export {
  convertTimeTo24HourClock,
  convertMinutesTo12HourClock,
  convert12HourTimeToMinutes,
  getTimezoneOffset,
  convertDurationToMinutes,
};
