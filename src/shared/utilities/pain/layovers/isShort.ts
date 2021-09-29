export const isShort = (fauxStartDate: Date, fauxEndDate: Date, isOvernight: boolean): boolean => {
  const tooShort = isOvernight ? 360 : 60; // less than 6 hours basically means you're trapped in the airport
  const layoverDurationInMinutes = Math.abs(fauxEndDate.valueOf() - fauxStartDate.valueOf()) / 60000;
  return layoverDurationInMinutes < tooShort;
};
