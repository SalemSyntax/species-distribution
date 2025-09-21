import React from "react";
import type {SpeciesData} from "../../types/species"
import { useSpeciesImage } from "../../hooks/useSpeciesImage";


interface informationBoxProps {
    speciesData?: SpeciesData
}


const InformationBox: React.FC<informationBoxProps> = ({ speciesData }) => {
  if (!speciesData) return null;
  
  const speciesImage = useSpeciesImage(speciesData.usage.key);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md text-black w-full">
      {/* Centered scientific name */}
      <h1 className="text-center text-2xl font-bold mb-4">
        {speciesData.usage.canonicalName}
      </h1>

      {/* Left-aligned taxonomy */}
      <div className="w-full max-w-md text-left mb-4">
        {Object.entries(speciesData.taxonomy).map(([rank, name]) => (
          <p key={rank}>
            <strong>{rank.charAt(0).toUpperCase() + rank.slice(1)}:</strong> {name}
          </p>
        ))}
      </div>

      {/* IUCN status */}
      {speciesData.status && (
        <div className="w-full max-w-md text-left">
          <p>
            <strong>IUCN Status:</strong> {speciesData.status.status} (
            {speciesData.status.statusCode})
          </p>
          <p>
            <strong>Source:</strong> {speciesData.status.datasetAlias}
          </p>
        </div>
      )}
      {speciesImage.data && <img
        src={speciesImage?.data ?? undefined}
        alt={speciesData.usage.canonicalName}
        className="mb-4 w-full max-w-sm rounded-lg object-cover"
        />}
    </div>
  );
};

export default InformationBox;