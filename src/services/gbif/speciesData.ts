import api from "../../api/axios";
import type {GBIFMatchResponse} from "../../types/species"

export const fetchSpeciesData = async (scientificName: string) => {
  const res = await api.get<GBIFMatchResponse>("/v2/species/match", {
    params: { scientificName: scientificName },
  });

  const { usage, classification, additionalStatus } = res.data;

  const taxonomy: Record<string, string> = {};
  
  classification.forEach((c) => {
    taxonomy[c.rank.toLowerCase()] = c.name;
  });

  return {
    usage,
    taxonomy,
    status: additionalStatus?.[0] ?? null, 
  };
};
