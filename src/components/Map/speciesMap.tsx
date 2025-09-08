import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useTaxonOccurrence } from "../../hooks/useTaxonOccurrence";
import { useTaxonKey } from "../../hooks/useTaxonKey";
import SpeciesPopup from "../Popup/speciesPopup";
import SpeciesFilter from "../Filters/speciesFilter";
import type { Occurrence } from "../../types/GBIF";

export default function SpeciesMap() {
  const [scientificName, setScientificName] = useState("Apteryx haastii");

  // Fetch taxonKey
  const { data: taxonKey, isLoading: isTaxonKeyLoading, isError: isTaxonKeyError } = useTaxonKey(scientificName);

  // Fetch occurrences only if taxonKey exists
  const { data: occurrences = [], isLoading: isOccurrenceLoading, isError: isOccurrenceError } = useTaxonOccurrence(taxonKey ?? undefined);

  const isLoading = isTaxonKeyLoading || isOccurrenceLoading;
  const isError = isTaxonKeyError || isOccurrenceError;

  return (
    <div className="relative h-screen w-screen">
      {/* Map fills screen */}
      <MapContainer
        center={[-44.0, 170.0]}
        zoom={5}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {taxonKey &&
          occurrences.map((occ: Occurrence) =>
            occ.decimalLatitude && occ.decimalLongitude ? (
              <Marker key={occ.key} position={[occ.decimalLatitude, occ.decimalLongitude]}>
                <Popup>
                  <SpeciesPopup occurrence={occ} />
                </Popup>
              </Marker>
            ) : null
          )}
      </MapContainer>

      {/* Floating filter */}
      <div className="absolute top-4 left-4 z-[2000] p-4 bg-white rounded-lg shadow-md">
        <SpeciesFilter
          defaultSpecies={scientificName}
          onChange={setScientificName}
          isLoading={isLoading}
        />
      </div>

      {/* Floating messages */}
      {isLoading && <p className="absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow">Loading...</p>}
      {isError && <p className="absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow">Error loading data</p>}
      {!isLoading && taxonKey === null && <p className="absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow">No species found for "{scientificName}"</p>}
      {!isLoading && taxonKey && occurrences.length === 0 && <p className="absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow">No occurrences found for "{scientificName}"</p>}
    </div>
  );
}



// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useState } from "react";
// import { useTaxonOccurrence } from "../../hooks/useTaxonOccurrence";
// import { useTaxonKey } from "../../hooks/useTaxonKey";
// import SpeciesPopup from "../Popup/speciesPopup";
// import SpeciesFilter from "../Filters/speciesFilter";
// import type { Occurrence } from "../../types/GBIF";

// export default function SpeciesMap() {
//   const [scientificName, setScientificName] = useState("Apteryx haastii");

//   // Fetch taxonKey
//   const { data: taxonKey, isLoading: isTaxonKeyLoading, isError: isTaxonKeyError } = useTaxonKey(scientificName);

//   // Fetch occurrences only if taxonKey exists
//   const { data: occurrences = [], isLoading: isOccurrenceLoading, isError: isOccurrenceError } = useTaxonOccurrence(taxonKey ?? undefined);

//   const isLoading = isTaxonKeyLoading || isOccurrenceLoading;
//   const isError = isTaxonKeyError || isOccurrenceError;

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Filter on top */}
//       <div className="p-4 z-1000">
//         <SpeciesFilter
//           defaultSpecies={scientificName}
//           onChange={setScientificName}
//           isLoading={isLoading}
//         />
//       </div>

//       {/* Map fills remaining space */}
//       <div className="flex-1">
//         {isLoading && <p className="absolute top-20 left-1/2 -translate-x-1/2">Loading...</p>}
//         {isError && <p className="absolute top-20 left-1/2 -translate-x-1/2">Error loading data</p>}
//         {!isLoading && taxonKey === null && (
//           <p className="absolute top-20 left-1/2 -translate-x-1/2">No species found for "{scientificName}"</p>
//         )}
//         {!isLoading && taxonKey && occurrences.length === 0 && (
//           <p className="absolute top-20 left-1/2 -translate-x-1/2">No occurrences found for "{scientificName}"</p>
//         )}

//         {taxonKey && occurrences.length > 0 && (
//           <MapContainer
//             center={[-44.0, 170.0]}
//             zoom={5}
//             zoomControl={false}
//             className="w-full h-full"
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; OpenStreetMap contributors"
//             />
//             {occurrences.map((occ: Occurrence) =>
//               occ.decimalLatitude && occ.decimalLongitude ? (
//                 <Marker key={occ.key} position={[occ.decimalLatitude, occ.decimalLongitude]}>
//                   <Popup>
//                     <SpeciesPopup occurrence={occ} />
//                   </Popup>
//                 </Marker>
//               ) : null
//             )}
//           </MapContainer>
//         )}
//       </div>
//     </div>

//   );
// }
