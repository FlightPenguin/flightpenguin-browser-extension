import { faCalendar as faCalendarRegular, faLifeRing } from "@fortawesome/free-regular-svg-icons";
import {
  faBusinessTime,
  faCalendar as faCalendarSolid,
  faCog,
  faExpandAlt,
  faFilter,
  faHandsHelping,
  faMapMarkerAlt,
  faPen,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
  faShare,
  faSignOutAlt,
  faUser,
  faUserPlus,
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
          faHandsHelping,
          faUser,
          faUserPlus,
          faPlaneArrival,
          faPlaneDeparture,
          faMapMarkerAlt,
          faSearch,
          faShare,
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
