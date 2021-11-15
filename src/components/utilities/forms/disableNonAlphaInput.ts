import { isAlphaKeyboardInput } from "./isAlphaKeyboardInput";
import { isWhitespaceKeyboardInput } from "./isWhitespaceKeyboardInput";

export const disableNonAlphaInput = (event: KeyboardEvent, allowWhitespace = false): void => {
  if (!isAlphaKeyboardInput(event) && allowWhitespace && !isWhitespaceKeyboardInput(event)) {
    event.preventDefault();
  }
};
