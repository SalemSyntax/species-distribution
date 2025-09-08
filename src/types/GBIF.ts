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
