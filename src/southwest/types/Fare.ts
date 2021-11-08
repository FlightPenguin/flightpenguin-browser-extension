export interface FareFamily {
  fareFamily: string;
  minimumFare: Fare;
}

export interface Fare {
  value: string;
  currencyCode: string;
}
