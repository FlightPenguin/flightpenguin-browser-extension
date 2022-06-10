export const isFirefoxExtension = (): boolean => {
  return location.protocol === "moz-extension:";
};
