
// src/hooks/useTaxonOccurrence.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTaxonOccurrence } from "../services/gbif/occurence";
import type { Occurrence } from "../types/GBIF";


export const useTaxonOccurrence = (
  taxonKey?: number | null,
  bounds?: { minLat: number; maxLat: number; minLng: number; maxLng: number }
) => {
  return useQuery<Occurrence[]>({
    queryKey: ["gbif", "occurrences", taxonKey, bounds],
    queryFn: () => fetchTaxonOccurrence(taxonKey!, bounds),
    enabled: !!taxonKey && !!bounds,
  });
};

