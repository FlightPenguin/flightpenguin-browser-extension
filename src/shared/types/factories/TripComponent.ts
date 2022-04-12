import { Factory } from "fishery";

import { TripComponent, TripComponentInput } from "../TripComponent";
import { FlightInputFactory } from "./Flight";
import { LayoverInputFactory } from "./Layover";

export const TripComponentInputFactory = Factory.define<TripComponentInput>(({ params }) => {
  let type = params.type;
  let object = params.object;

  if (!type && !object) {
    type = "FLIGHT";
    object = FlightInputFactory.build();
  } else if (!type && !!object) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    type = object["marketingAirline"] ? "FLIGHT" : "LAYOVER";
  } else if (!!type && !object) {
    object = type === "FLIGHT" ? FlightInputFactory.build() : LayoverInputFactory.build();
  }

  return { type, object } as TripComponentInput;
});

export const TripComponentFactory = Factory.define<TripComponent, TripComponentInput>(({ transientParams }) => {
  const input = TripComponentInputFactory.build(transientParams);

  return new TripComponent(input);
});
