// src/hooks/useTaxonKey.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTaxonOccurrence } from "../services/gbif/occurence"; 
import type { Occurrence } from "../types/GBIF";

export const useTaxonOccurrence = (taxonKey?: number | null) => {
  return useQuery<Occurrence[]>({
    queryKey: ["gbif", "occurrences", taxonKey],
    queryFn: () => fetchTaxonOccurrence(taxonKey!),
    enabled: !!taxonKey,
  });
};
