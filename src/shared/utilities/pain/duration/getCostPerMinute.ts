export const getCostPerMinute = (multiplier: number): number => {
  const costPerHour = 25 * multiplier;
  return costPerHour / 60;
};
