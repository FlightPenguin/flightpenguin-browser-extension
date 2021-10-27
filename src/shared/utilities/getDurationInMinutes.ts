export const getDurationInMinutes = (duration: string): number => {
  // duration looks like 10h 30m
  const [durationHours, remainder] = duration.includes("h") ? duration.split("h") : [0, duration];
  const durationMinutes = remainder.trim().split("m")[0] || 0;
  return Number(durationMinutes) + Number(durationHours) * 60;
};
