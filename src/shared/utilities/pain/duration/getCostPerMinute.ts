export const getCostPerMinute = (multiplier: number): number => {
  const costPerHour = 15 * multiplier;
  return costPerHour / 60;
};
