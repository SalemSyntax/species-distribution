// src/services/species.ts
import api from "../../api/axios";

// Response type for multiple species suggestions
export interface GBIFSpeciesSuggestion {
  key: number;
  scientificName: string;
  canonicalName: string;
  rank: string;
  status: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
}

// Fetch multiple species suggestions
export const fetchTaxonSuggestions = async (
  query: string
): Promise<GBIFSpeciesSuggestion[]> => {
  const res = await api.get<GBIFSpeciesSuggestion[]>(
    "/species/suggest",
    { params: { q: query } }
  );
  return res.data;
};