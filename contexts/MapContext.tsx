"use client";

import React, { createContext, useState, useContext } from 'react';
import type { LatLngExpression, LatLng, LatLngBoundsExpression } from 'leaflet';

interface MapContextType {
  center: LatLngExpression;
  zoom: number;
  markerPosition: LatLng | null;
  boundingBox: LatLngBoundsExpression | null;
  setCenter: (center: LatLngExpression) => void;
  setZoom: (zoom: number) => void;
  setMarkerPosition: (position: LatLng | null) => void;
  setBoundingBox: (boundingBox: LatLngBoundsExpression | null) => void;
  handleAddressSubmit: (address: string) => Promise<void>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [center, setCenter] = useState<LatLngExpression>([51.505, -0.09]);
  const [zoom, setZoom] = useState(13);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [boundingBox, setBoundingBox] = useState<LatLngBoundsExpression | null>(null);

  const handleAddressSubmit = async (address: string) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, boundingbox } = data[0];
        const newCenter: LatLngExpression = [parseFloat(lat), parseFloat(lon)];
        setCenter(newCenter);
        setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lon) } as LatLng);
        setBoundingBox([[boundingbox[0], boundingbox[2]], [boundingbox[1], boundingbox[3]]]);
        setZoom(12);
      } else {
        alert('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      alert('Error fetching address');
    }
  };

  return (
    <MapContext.Provider value={{ 
      center, 
      zoom, 
      markerPosition, 
      boundingBox, 
      setCenter, 
      setZoom, 
      setMarkerPosition, 
      setBoundingBox,
      handleAddressSubmit 
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};