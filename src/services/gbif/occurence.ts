// src/services/gbif/occurrence.ts
import api from "../../api/axios";
import type { Occurrence } from '../../types/GBIF';

interface GBIFOccurrenceResponse {
  results: any[];
}

export const fetchTaxonOccurrence = async (
  taxonKey: number,
  bounds?: { minLat: number; maxLat: number; minLng: number; maxLng: number }
): Promise<Occurrence[]> => {
  const params: any = {
    taxonKey,
    hasCoordinate: true,
    limit: 1000,
  };

  if (bounds) {
    params.minLatitude = bounds.minLat;
    params.maxLatitude = bounds.maxLat;
    params.minLongitude = bounds.minLng;
    params.maxLongitude = bounds.maxLng;
  }

  const res = await api.get<GBIFOccurrenceResponse>("/v1/occurrence/search", { params });

  return (
    res.data.results.map((occ: any) => ({
      key: occ.key,
      decimalLatitude: occ.decimalLatitude,
      decimalLongitude: occ.decimalLongitude,
      species: occ.species,
      country: occ.country,
      eventDate: occ.eventDate,
      basisOfRecord: occ.basisOfRecord,
    })) || []
  );
};

