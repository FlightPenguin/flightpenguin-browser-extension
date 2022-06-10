// note - this works on any chromium browser following chrome's extension naming
export const isChromeExtension = (): boolean => {
  return location.protocol === "chrome-extension:";
};
