// src/hooks/useTaxonKey.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSpeciesData } from "../services/gbif/speciesData";

export const useSpeciesData = (scientificName: string) => {
  return useQuery({
    queryKey: ["speciesData", scientificName],
    queryFn: () => fetchSpeciesData(scientificName),
    enabled: !!scientificName,
  });
};
