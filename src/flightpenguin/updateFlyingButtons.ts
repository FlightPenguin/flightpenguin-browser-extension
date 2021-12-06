import { getExtensionUrl } from "../shared/utilities/getExtensionUrl";

export const updateFlyingButtons = (): void => {
  const extensionUrl = getExtensionUrl();
  const buttons = getFlyingButtons();
  buttons.forEach((button) => {
    button.setAttribute("href", extensionUrl);
  });
};

const getFlyingButtons = (): HTMLButtonElement[] => {
  const buttons = document.querySelectorAll(
    "a[href='https://chrome.google.com/webstore/detail/flightpenguin/nofndgfpjopdpbcejgdpikmpdehlekac']",
  ) as NodeListOf<HTMLButtonElement>;
  return Array.from(buttons);
};
