import type { GBIFSpeciesSuggestion } from "../types/GBIF";

/**
 * Returns unique GBIF species suggestions based on canonicalName.
 * Keeps the last occurrence of each canonicalName.
 */
export function getUniqueByCanonicalName(
  suggestions: GBIFSpeciesSuggestion[]
): GBIFSpeciesSuggestion[] {
  return Object.values(
    suggestions.reduce<Record<string, GBIFSpeciesSuggestion>>((acc, item) => {
      acc[item.canonicalName] = item;
      return acc;
    }, {})
  );
}
