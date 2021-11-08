import { Fare } from "./Fare";

export interface Flight {
  originationAirportCode: string;
  destinationAirportCode: string;
  departureTime: string;
  arrivalTime: string;
  nextDay: boolean;
  totalDuration: string;
  flightNumbers: string[];
  filterTags: string[];
  departureDateTime: string;
  arrivalDateTime: string;
  segments: FlightLeg[];
  fareProducts: Product;
}

interface FlightLeg {
  originationAirportCode: string;
  destinationAirportCode: string;
  flightNumber: string;
  duration: string;
  numberOfStops: number;
  departureTime: string;
  arrivalTime: string;
  departureDateTime: string;
  arrivalDateTime: string;
  operatingCarrierCode: string;
  marketingCarrierCode: string;
  aircraftEquipmentType: string;
  features: string[];
  wifiOnBoard: boolean;
  stopsDetails: FlightStop[];
}

interface FlightStop {
  originationAirportCode: string;
  destinationAirportCode: string;
  flightNumber: string;
  legDuration: number;
  stopDuration: number;
  departureTime: string;
  arrivalTime: string;
  departureDateTime: string;
  arrivalDateTime: string;
}

interface Product {
  [keyof: string]: {
    [keyof: string]: {
      productId: string;
      classOfService: string | null;
      passengerType: string;
      availabilityStatus: string;
      originalFare: Fare | null;
      fare: {
        baseFare: Fare;
        totalTaxesAndFees: Fare;
        totalFare: Fare;
        accrualPoints: string;
      };
      waivedFare: Fare | null;
    };
  };
}
/*{
    "fareProducts": {
        "ADULT": {
            "WGA": {
                "productId": "WGA|VLMUW2H,V,SFO,LAX,2021-11-08T19:45-08:00,2021-11-08T21:10-08:00,WN,WN,2570,73W",
                "classOfService": null,
                "passengerType": "ADULT",
                "availabilityStatus": "AVAILABLE",
                "originalFare": null,
                "fare": {
                    "baseFare": {
                        "value": "22.87",
                        "currencyCode": "USD"
                    },
                    "totalTaxesAndFees": {
                        "value": "16.12",
                        "currencyCode": "USD"
                    },
                    "totalFare": {
                        "value": "38.99",
                        "currencyCode": "USD"
                    },
                    "accrualPoints": "138"
                },
                "waivedFare": null
            },
            "BUS": {
                "productId": "BUS|BLN7W8V,B,SFO,LAX,2021-11-08T19:45-08:00,2021-11-08T21:10-08:00,WN,WN,2570,73W",
                "classOfService": null,
                "passengerType": "ADULT",
                "availabilityStatus": "AVAILABLE",
                "originalFare": null,
                "fare": {
                    "baseFare": {
                        "value": "106.59",
                        "currencyCode": "USD"
                    },
                    "totalTaxesAndFees": {
                        "value": "22.39",
                        "currencyCode": "USD"
                    },
                    "totalFare": {
                        "value": "128.98",
                        "currencyCode": "USD"
                    },
                    "accrualPoints": "1280"
                },
                "waivedFare": null
            },
            "ANY": {
                "productId": "ANY|VLN7W6B,V,SFO,LAX,2021-11-08T19:45-08:00,2021-11-08T21:10-08:00,WN,WN,2570,73W",
                "classOfService": null,
                "passengerType": "ADULT",
                "availabilityStatus": "AVAILABLE",
                "originalFare": null,
                "fare": {
                    "baseFare": {
                        "value": "69.38",
                        "currencyCode": "USD"
                    },
                    "totalTaxesAndFees": {
                        "value": "19.60",
                        "currencyCode": "USD"
                    },
                    "totalFare": {
                        "value": "88.98",
                        "currencyCode": "USD"
                    },
                    "accrualPoints": "694"
                },
                "waivedFare": null
            }
        }
    }
}*/
