import React from "react";
import SpeciesFilter from "../Filters/speciesFilter";
import InformationBox from "../InformationBox/informationBox";
import type {SpeciesData} from "../../types/species"


interface SidePanelProps {
  scientificName: string;
  setScientificName: (name: string) => void;
  isLoading: boolean;
  speciesData?: SpeciesData;
}

const SidePanel: React.FC<SidePanelProps> = ({
  scientificName,
  setScientificName,
  isLoading,
  speciesData
}) => {


  return (
    <div className="absolute top-0 left-0 z-[2000]">
      <div className="flex flex-col items-center p-4 gap-4">
        <SpeciesFilter
          defaultSpecies={scientificName}
          onChange={setScientificName}
          isLoading={isLoading}
        />
        {speciesData && <InformationBox
        speciesData={speciesData}
        />
        }
      </div>
    </div>
  );
};

export default SidePanel;
