import { faCalendar as faCalendarRegular, faLifeRing } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar as faCalendarSolid,
  faCog,
  faFilter,
  faMapMarkerAlt,
  faPen,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeConfig } from "bumbag";

export const FlightPenguinTheme: ThemeConfig = {
  icons: {
    iconSets: [
      {
        icons: [
          faCalendarSolid,
          faCog,
          faUser,
          faPlaneArrival,
          faPlaneDeparture,
          faMapMarkerAlt,
          faSearch,
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
