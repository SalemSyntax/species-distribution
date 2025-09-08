// src/hooks/useTaxonKey.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTaxonKey } from "../services/gbif/taxon";

export const useTaxonKey = (scientificName: string) => {
  return useQuery({
    queryKey: ["taxonKey", scientificName],
    queryFn: () => fetchTaxonKey(scientificName),
    enabled: !!scientificName,
  });
};
