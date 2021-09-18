import { isAlphaKeyboardInput } from "./isAlphaKeyboardInput";

export const disableNonAlphaInput = (event: KeyboardEvent): void => {
  if (!isAlphaKeyboardInput(event)) {
    event.preventDefault();
  }
};
