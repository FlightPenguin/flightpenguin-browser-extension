import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface IsFlightOperatedByCarriersProps {
  flight: ProcessedFlightSearchResult;
  carriers: string[] | undefined;
}

export const isFlightOperatedByCarriers = ({ flight, carriers }: IsFlightOperatedByCarriersProps): boolean => {
  if (carriers && carriers.length >= 1) {
    return flight.carriers.every((carrier) => carriers.includes(carrier));
  }
  return true;
};
