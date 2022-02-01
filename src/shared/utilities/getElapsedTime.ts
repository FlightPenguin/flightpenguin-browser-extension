export const getElapsedTime = (time: string, addElapsedDays: boolean): { hours: number; minutes: number } => {
  const timeFormatted = time.toLowerCase();
  const [rawHours, hoursRemainder] = timeFormatted.split(":");
  const [rawMinutes] = hoursRemainder.split(/[a|p]m|[+-]\d/);

  let hours = Number(rawHours);

  if (timeFormatted.includes("pm") && hours % 12 !== 0) {
    hours += 12;
  } else if (timeFormatted.includes("am") && hours % 12 === 0) {
    hours -= 12;
  }

  if (addElapsedDays) {
    const daysToAdd = time.match(/[+-]\d/);
    if (daysToAdd && time.includes("+")) {
      hours += Number(daysToAdd[0].split("+")[1]) * 24;
    } else if (daysToAdd && time.includes("-")) {
      hours -= Number(daysToAdd[0].split("-")[1]) * 24;
    }
  }

  const minutes = rawMinutes ? Number(rawMinutes) : 0;
  return { hours, minutes };
};
