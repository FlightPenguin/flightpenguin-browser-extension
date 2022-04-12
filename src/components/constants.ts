export const defaultSearchFormWidth = 768;
export const sidePaddingWidth = 85;
export const pageSidePadding = 32;
export const rowHeight = 90;

export const PointsMap = {
  "CHASE-SAPPHIRE-RESERVE": 0.015,
  "CHASE-SAPPHIRE-PREFERRED": 0.0125,
};
export type CardType = "CHASE-SAPPHIRE-RESERVE" | "CHASE-SAPPHIRE-PREFERRED";
export type PaymentType = "CASH" | "CHASE-SAPPHIRE-RESERVE" | "CHASE-SAPPHIRE-PREFERRED";
export type TripSortDimension = "pain" | "fare" | "duration" | "dta" | "dtd" | "ata" | "atd";
export const TripSortDimensionDisplayMap = {
  pain: "Pain",
  fare: "Price",
  duration: "Duration",
  dta: "Dep. Time ↑",
  dtd: "Dep. Time ↓",
  ata: "Arr. Time ↑",
  atd: "Arr. Time ↓",
};
