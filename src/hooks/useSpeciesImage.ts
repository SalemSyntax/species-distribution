// src/hooks/useTaxonKey.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSpeciesImage } from "../services/gbif/speciesImage";

export const useSpeciesImage = (usageKey: number) => {
  return useQuery({
    queryKey: ["speciesImage", usageKey],
    queryFn: () => fetchSpeciesImage(usageKey),
    enabled: !!usageKey,
  });
};
