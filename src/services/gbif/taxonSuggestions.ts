// src/services/species.ts
import api from "../../api/axios";
import type { GBIFSpeciesSuggestion } from "../../types/GBIF";

// Fetch multiple species suggestions
export const fetchTaxonSuggestions = async (
  query: string
): Promise<GBIFSpeciesSuggestion[]> => {
  const res = await api.get<GBIFSpeciesSuggestion[]>(
    "/v1/species/suggest",
    { params: { q: query } }
  );
  return res.data;
};