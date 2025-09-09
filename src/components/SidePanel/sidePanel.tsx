import React from "react";
import SpeciesFilter from "../Filters/speciesFilter";

interface SidePanelProps {
  scientificName: string;
  setScientificName: (name: string) => void;
  isLoading: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({
  scientificName,
  setScientificName,
  isLoading,
}) => {
  return (
    <div className="flex items-center p-4">
      <div className="absolute top-4 left-4 z-[2000] rounded-lg shadow-md">
        <SpeciesFilter
          defaultSpecies={scientificName}
          onChange={setScientificName}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SidePanel;
