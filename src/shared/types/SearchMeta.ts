export interface SearchTripMeta {
  airports: string[];
  airlines: string[];
  layoverCounts: number[];
}

export const SearchTripMetaDefault = {
  layoverCounts: [] as number[],
  airlines: [] as string[],
  airports: [] as string[],
} as SearchTripMeta;
