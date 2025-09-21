// types.ts
export type Occurrence = {
  key: number;
  decimalLatitude: number;
  decimalLongitude: number;
  species: string;
  country?: string;
  eventDate?: string;
  basisOfRecord?: string;
};

// Response type for multiple species suggestions
export interface GBIFSpeciesSuggestion {
  key: number;
  scientificName: string;
  canonicalName: string;
  rank: string;
  status: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
}