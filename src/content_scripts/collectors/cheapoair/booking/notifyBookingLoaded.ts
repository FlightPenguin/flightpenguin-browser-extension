import { sendFocusWebpage } from "../../../../shared/events/sendFocusWebpage";

export const initBookingPageLoadedListener = () => {
  window.addEventListener("DOMContentLoaded", function () {
    sendFocusWebpage("cheapoair");
  });
};
