import { faCalendar as faCalendarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar as faCalendarSolid,
  faMapMarkerAlt,
  faPen,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const FlightPenguinTheme = {
  icons: {
    iconSets: [
      {
        icons: [faCalendarSolid, faUser, faPlaneArrival, faPlaneDeparture, faMapMarkerAlt, faSearch, faPen],
        prefix: "solid-",
        type: "font-awesome",
      },
      {
        icons: [faCalendarRegular],
        prefix: "regular-",
        type: "font-awesome",
      },
    ],
  },
};
