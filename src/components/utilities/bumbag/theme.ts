import { faCalendar as faCalendarRegular, faLifeRing } from "@fortawesome/free-regular-svg-icons";
import {
  faBusinessTime,
  faCalendar as faCalendarSolid,
  faCog,
  faExpandAlt,
  faFilter,
  faMapMarkerAlt,
  faPen,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeConfig } from "bumbag";

export const FlightPenguinTheme: ThemeConfig = {
  icons: {
    iconSets: [
      {
        icons: [
          faBusinessTime,
          faCalendarSolid,
          faCog,
          faExpandAlt,
          faUser,
          faPlaneArrival,
          faPlaneDeparture,
          faMapMarkerAlt,
          faSearch,
          faSignOutAlt,
          faPen,
          faFilter,
        ],
        prefix: "solid-",
        type: "font-awesome",
      },
      {
        icons: [faCalendarRegular, faLifeRing],
        prefix: "regular-",
        type: "font-awesome",
      },
    ],
  },
};
