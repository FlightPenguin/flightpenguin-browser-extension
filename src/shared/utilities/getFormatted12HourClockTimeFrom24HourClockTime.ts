export const getFormatted12HourClockTimeFrom24HourClockTime = (inputTime: string): string => {
  const [clockTime, excessDays] = inputTime.trim().split("+");
  const [inputHours, minutes] = clockTime.trim().split(":");
  const designator = Number(inputHours) <= 11 ? "am" : "pm";

  let hours;
  if (designator === "am") {
    hours = inputHours === "00" ? "12" : Number(inputHours).toString();
  } else {
    hours = inputHours === "12" ? "12" : (Number(inputHours) - 12).toString();
  }

  let time = `${hours}:${minutes}${designator}`;
  if (excessDays) {
    time += `+${excessDays}`;
  }
  return time;
};
