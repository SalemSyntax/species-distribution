// src/services/species.ts
import api from "../../api/axios";
import type { Occurrence } from '../../types/GBIF';

interface GBIFOccurrenceResponse {
  results: any[]; // raw GBIF response; you could refine this later
}

export const fetchTaxonOccurrence = async (
  taxonKey: number
): Promise<Occurrence[]> => {
  const res = await api.get<GBIFOccurrenceResponse>('/occurrence/search', {
    params: {
      taxonKey,
      hasCoordinate: true,
      limit: 1000,
    },
  });

  return res.data.results.map((occ: any) => ({
    key: occ.key,
    decimalLatitude: occ.decimalLatitude,
    decimalLongitude: occ.decimalLongitude,
    species: occ.species,
    country: occ.country,
    eventDate: occ.eventDate,
    basisOfRecord: occ.basisOfRecord,
  })) || [];
};
