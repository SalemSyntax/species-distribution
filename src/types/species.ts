// src/services/species.ts
export interface GBIFClassification {
  key: number;
  name: string;
  rank: string;
}

export interface GBIFAdditionalStatus {
  datasetAlias: string;
  status: string;
  statusCode: string;
}

export interface GBIFUsage {
  key: number;
  name: string;
  canonicalName: string;
  authorship: string;
  rank: string;
  genericName: string;
  specificEpithet: string;
  formattedName: string;
}

export interface GBIFMatchResponse {
  usage: GBIFUsage;
  classification: GBIFClassification[];
  additionalStatus?: GBIFAdditionalStatus[];
}


export interface SpeciesData {
  usage: GBIFUsage;
  taxonomy: Record<string, string>;
  status: GBIFAdditionalStatus | null;
}

export interface SpeciesImageResult {
  type: string;          // "StillImage"
  format: string;        // "image/jpeg"
  source: string;        // data source name
  created: string;       // ISO date string
  license: string;       // license info
  rightsHolder: string;  // author/rights holder
  taxonKey: number;      // GBIF taxon key
  sourceTaxonKey: number;// source taxon key
  identifier: string;    // image URL
}

export interface SpeciesImage {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  results: SpeciesImageResult[];
}
