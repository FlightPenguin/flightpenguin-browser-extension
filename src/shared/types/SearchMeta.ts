export interface SearchTripMeta {
  airlineCount: number;
  airports: string[];
  airlines: { [keyof: string]: string[] };
  layoverCounts: number[];
}

export const SearchTripMetaDefault = {
  airlineCount: 0,
  layoverCounts: [] as number[],
  airlines: {} as { [keyof: string]: string[] },
  airports: [] as string[],
} as SearchTripMeta;
