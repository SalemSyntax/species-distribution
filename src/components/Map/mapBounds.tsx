// src/components/Map/MapBoundsTracker.tsx
import { useMapEvent, useMap } from "react-leaflet";
import React, { useEffect, useRef } from "react";

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

  const map = useMap();

  const prevBoundsRef = useRef<MapBounds | null>(null);

  const updateBounds = () => {
    const bounds = map.getBounds();

    const newBounds: MapBounds = {
      minLat: bounds.getSouth(),
      maxLat: bounds.getNorth(),
      minLng: bounds.getWest(),
      maxLng: bounds.getEast() 
    }

    const prev = prevBoundsRef.current;

    if (
      !prev ||
      newBounds.minLat < prev.minLat ||
      newBounds.maxLat > prev.maxLat ||
      newBounds.minLng < prev.minLng ||
      newBounds.maxLng > prev.maxLng
    ) {
      prevBoundsRef.current = newBounds;
      onBoundsChange(newBounds);
    }
  };

  useEffect(() => {
    updateBounds();
  },[map]);

  useMapEvent("moveend", updateBounds);

  return null;
};

export default MapBoundsTracker;
