// src/services/species.ts
import api from "../../api/axios";

interface GBIFMatchResponse {
  usageKey?: number;
  [key: string]: unknown;
}

export const fetchTaxonKey = async (
  scientificName: string
): Promise<number | null> => {
  const res = await api.get<GBIFMatchResponse>("/species/match", {
    params: { name: scientificName },
  });

  return res.data.usageKey ?? null;
};
