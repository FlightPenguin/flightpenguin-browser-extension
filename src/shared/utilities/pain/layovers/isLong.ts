export const isLong = (fauxStartDate: Date, fauxEndDate: Date, isOvernight: boolean): boolean => {
  const tooLong = isOvernight
    ? 10 * 60 // 10 hours
    : 3 * 60; // 3 hours

  const layoverDurationInMinutes = Math.abs(fauxEndDate.valueOf() - fauxStartDate.valueOf()) / 60000;

  return layoverDurationInMinutes > tooLong;
};
