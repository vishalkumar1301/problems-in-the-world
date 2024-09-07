import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapUpdaterProps {
  center: L.LatLngExpression;
  zoom: number;
}

export const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};