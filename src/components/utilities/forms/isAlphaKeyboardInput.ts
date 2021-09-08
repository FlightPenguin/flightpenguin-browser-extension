export const isAlphaKeyboardInput = (event: KeyboardEvent): boolean => {
  return (
    (event.charCode >= 65 && event.charCode <= 90) ||
    (event.charCode >= 97 && event.charCode <= 122) ||
    event.charCode === 13 // be kind, allow enter...
  );
};
