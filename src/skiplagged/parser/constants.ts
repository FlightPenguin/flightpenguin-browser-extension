export interface FlightMap {
  [key: string]: { skiplaggedId: string; lastUpdatedAt: Date };
}
