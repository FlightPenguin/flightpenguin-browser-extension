import * as browser from "webextension-polyfill";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { WindowConfig } from "../../../shared/types/WindowConfig";

export const sendFormDataToBackground = (values: FlightSearchFormData): void => {
  const windowConfig: WindowConfig = {
    height: window.outerHeight,
    width: window.outerWidth,
    left: window.screenX,
    top: window.screenY,
  };
  browser.runtime.sendMessage({
    event: "FORM_DATA_RECEIVED",
    formData: values,
    windowConfig,
  });
};
