import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useTaxonOccurrence } from "../../hooks/useTaxonOccurrence";
import { useSpeciesData } from "../../hooks/useSpeciesData";
import SpeciesPopup from "../Popup/speciesPopup";
import SidePanel from "../SidePanel/sidePanel";
import FloatingMessage from "../Messages/FloatingMessage";
import MapBoundsTracker from "./mapBounds";
import type { MapBounds } from "./mapBounds";
import type { Occurrence } from "../../types/GBIF";

export default function SpeciesMap() {
  const [scientificName, setScientificName] = useState("");
  const [bounds, setBounds] = useState<MapBounds>();

  // Fetch taxonKey for the selected species
  const { data: speciesData, isLoading: isTaxonKeyLoading, isError: isTaxonKeyError } = useSpeciesData(scientificName);

  const taxonKey = speciesData?.usage.key;

  // Fetch occurrences filtered by taxonKey and map bounds
  const { data: occurrences, isLoading: isOccurrenceLoading, isError: isOccurrenceError } = useTaxonOccurrence(taxonKey ?? undefined, bounds);

  const isLoading = isTaxonKeyLoading || isOccurrenceLoading;
  const isError = isTaxonKeyError || isOccurrenceError;

  return (
    <div className="relative h-screen w-screen">
      {/* Map */}
      <MapContainer center={[-44.0, 170.0]} zoom={5} zoomControl={false} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Track map bounds */}
        <MapBoundsTracker onBoundsChange={setBounds} />

        {/* Occurrence markers */}
        {taxonKey &&
        occurrences &&
          occurrences.map(
            (occ: Occurrence) =>
              occ.decimalLatitude &&
              occ.decimalLongitude && (
                <Marker key={occ.key} position={[occ.decimalLatitude, occ.decimalLongitude]}>
                  <Popup>
                    <SpeciesPopup occurrence={occ} />
                  </Popup>
                </Marker>
              )
          )}
      </MapContainer>

      {/* Side Panel */}
      <SidePanel
        scientificName={scientificName}
        setScientificName={setScientificName}
        isLoading={isLoading}
        speciesData={speciesData}
      />

      {/* Floating messages */}
      {isLoading && <FloatingMessage>Loading...</FloatingMessage>}
      {isError && <FloatingMessage>Error loading data</FloatingMessage>}
      {!isLoading && taxonKey === null && (
        <FloatingMessage>No species found for "{scientificName}"</FloatingMessage>
      )}
      {!isLoading && taxonKey && occurrences && occurrences.length === 0 && (
        <FloatingMessage>No occurrences found for "{scientificName}"</FloatingMessage>
      )}
    </div>
  );
};