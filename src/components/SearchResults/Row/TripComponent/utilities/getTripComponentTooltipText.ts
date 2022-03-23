import { Flight } from "../../../../../shared/types/newtypes/Flight";
import { Layover } from "../../../../../shared/types/newtypes/Layover";
import { TripComponent } from "../../../../../shared/types/newtypes/TripComponent";

export const getTripComponentTooltipText = (tripComponent: TripComponent): string => {
  let text;
  if (tripComponent.getObject().getType() === "LAYOVER") {
    const layover = tripComponent.getObject() as Layover;
    text = `Layover in ${layover.getArrivalLocation().getCode()}`;
    text += "\n";
    if (layover.isTransfer()) {
      text += `With transfer to ${layover.getDepartureLocation().getCode()}`;
      text += "\n";
    }
    text += `Begins at ${layover.getDisplayArrivalTime()} local time`;
    text += "\n";
    text += `Ends at ${layover.getDisplayDepartureTime()} local time`;
    text += "\n";
    text += `Layover duration of ${layover.getDisplayDuration()}`;
  } else {
    const flight = tripComponent.getObject() as Flight;
    text = `${flight.getAirline().getName()}`;
    text += "\n";
    text += `Departs from ${flight.getDepartureLocation().getCode()} at ${flight.getDisplayDepartureTime()} local time`;
    text += "\n";
    text += `Arrives at ${flight.getArrivalLocation().getCode()} at ${flight.getDisplayArrivalTime()} local time`;
    text += "\n";
    text += `Flight duration of ${flight.getDisplayDuration()}`;
  }
  return text;
};
