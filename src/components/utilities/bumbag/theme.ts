import { faCalendar, faPlaneArrival, faPlaneDeparture, faUser } from "@fortawesome/free-solid-svg-icons";

export const FlightPenguinTheme = {
  icons: {
    iconSets: [
      {
        icons: [faCalendar, faUser, faPlaneArrival, faPlaneDeparture],
        prefix: "solid-",
        type: "font-awesome",
      },
    ],
  },
};
