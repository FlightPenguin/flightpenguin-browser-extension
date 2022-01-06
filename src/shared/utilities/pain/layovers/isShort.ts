export const isShort = (fauxStartDate: Date, fauxEndDate: Date): boolean => {
  const tooShort = 60; // less than an hour means you're sprinting to the next flight and praying no delay
  const layoverDurationInMinutes = Math.abs(fauxEndDate.valueOf() - fauxStartDate.valueOf()) / 60000;

  return layoverDurationInMinutes < tooShort;
};
