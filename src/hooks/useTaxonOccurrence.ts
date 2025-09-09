// src/hooks/useTaxonOccurrence.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTaxonOccurrence } from "../services/gbif/occurence";
import { useState, useEffect } from "react";
import type { Occurrence } from "../types/GBIF";

export interface Bounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export const useTaxonOccurrence = (
  taxonKey?: number | null,
  bounds?: Bounds
) => {
  const [loadedOccurrences, setLoadedOccurrences] = useState<Occurrence[]>([]);
  const [fetchedAreas, setFetchedAreas] = useState<Bounds[]>([]); // track areas already fetched

  // Determine if this bounds intersects with any previously fetched area
  const shouldFetch =
    !!taxonKey &&
    !!bounds &&
    !fetchedAreas.some(
      (area) =>
        bounds.minLat >= area.minLat &&
        bounds.maxLat <= area.maxLat &&
        bounds.minLng >= area.minLng &&
        bounds.maxLng <= area.maxLng
    );

  const query = useQuery({
    queryKey: ["gbif", "occurrences", taxonKey], // cache per taxonKey only
    queryFn: () => fetchTaxonOccurrence(taxonKey!, bounds),
    enabled: shouldFetch,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Merge newly fetched occurrences into loadedOccurrences
  useEffect(() => {
    if (query.data) {
      setLoadedOccurrences((prev) => {
        const existingKeys = new Set(prev.map((o) => o.key));
        const newOccurrences = query.data!.filter((o) => !existingKeys.has(o.key));
        return [...prev, ...newOccurrences];
      });

      // Record the area we just fetched
      if (bounds) {
        setFetchedAreas((prev) => [...prev, bounds]);
      }
    }
  }, [query.data, bounds]);

  return {
    data: loadedOccurrences,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};



// // src/hooks/useTaxonOccurrence.ts
// import { useQuery } from "@tanstack/react-query";
// import { fetchTaxonOccurrence } from "../services/gbif/occurence";
// import type { Occurrence } from "../types/GBIF";

// export const useTaxonOccurrence = (
//   taxonKey?: number | null,
//   bounds?: { minLat: number; maxLat: number; minLng: number; maxLng: number }
// ) => {
//   return useQuery<Occurrence[]>({
//     queryKey: ["gbif", "occurrences", taxonKey, bounds],
//     queryFn: () => fetchTaxonOccurrence(taxonKey!, bounds),
//     enabled: !!taxonKey && !!bounds,
//   });
// };


// // src/hooks/useTaxonKey.ts
// import { useQuery } from "@tanstack/react-query";
// import { fetchTaxonOccurrence } from "../services/gbif/occurence"; 
// import type { Occurrence } from "../types/GBIF";

// export const useTaxonOccurrence = (taxonKey?: number | null) => {
//   return useQuery<Occurrence[]>({
//     queryKey: ["gbif", "occurrences", taxonKey],
//     queryFn: () => fetchTaxonOccurrence(taxonKey!),
//     enabled: !!taxonKey,
//   });
// };
