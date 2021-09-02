export const setType = (event: Event, inputType: "text" | "date", callback?: (event: Event) => any) => {
  const target = event?.currentTarget as HTMLInputElement;
  if (target) {
    target.type = inputType;
  }
  if (callback) {
    return callback(event);
  }
};
