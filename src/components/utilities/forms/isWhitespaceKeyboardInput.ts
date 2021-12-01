export const isWhitespaceKeyboardInput = (event: KeyboardEvent): boolean => {
  return (
    event.charCode === 32 || event.charCode === 13 // be kind, allow enter...
  );
};
