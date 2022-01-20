export interface SearchLegMeta {
  airports: string[];
  airlines: string[];
  layoverCounts: number[];
}

export interface SearchMeta {
  departures: SearchLegMeta;
  returns: SearchLegMeta;
}
