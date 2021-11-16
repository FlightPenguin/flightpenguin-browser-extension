export interface Airport {
  key: string;
  label: string;
  name: string;
  location: string;
  value: string;
  raw?: {
    name?: string;
    iataCode?: string;
    city?: string;
    stateProvince?: string;
    country?: string;
  };
}