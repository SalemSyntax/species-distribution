// src/hooks/useTaxonSuggestions.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTaxonSuggestions } from "../services/gbif/taxonSuggestions";

export const useTaxonSuggestions = (query: string) => {
  return useQuery({
    queryKey: ["taxonSuggestions", query],
    queryFn: () => fetchTaxonSuggestions(query),
    enabled: query.length > 1, // only fetch if user typed >1 char
  });
};
