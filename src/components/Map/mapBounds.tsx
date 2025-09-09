// src/components/Map/MapBoundsTracker.tsx
import { useMapEvent } from "react-leaflet";
import React from "react";

export interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface MapBoundsTrackerProps {
  onBoundsChange: (bounds: MapBounds) => void;
}

const MapBoundsTracker: React.FC<MapBoundsTrackerProps> = ({ onBoundsChange }) => {
  useMapEvent("moveend", (map) => {
    const b = map.target.getBounds();
    onBoundsChange({
      minLat: b.getSouth(),
      maxLat: b.getNorth(),
      minLng: b.getWest(),
      maxLng: b.getEast(),
    });
  });

  return null;
};

export default MapBoundsTracker;
