import api from "../../api/axios";
import type {SpeciesImage} from "../../types/species"

export const fetchSpeciesImage = async (usageKey: number): Promise<string | null> => {
  try {
    const res = await api.get(`/v1/species/${usageKey}/media`, {
      params: {
        usageKey: usageKey,
        limit: 1,
      },
    });

    const firstResult = res.data.results[0];

    if (firstResult?.identifier) {
      return firstResult.identifier; // this is the image URL
    }

    return null;
  } catch (err) {
    console.error("Error fetching species image:", err);
    return null;
  }
};