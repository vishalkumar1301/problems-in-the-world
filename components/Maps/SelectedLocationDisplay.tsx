import React from 'react';
import { SelectedLocationDisplayProps } from '@/interfaces/props/MapInterfaces';

export const SelectedLocationDisplay: React.FC<SelectedLocationDisplayProps> = ({ markerPosition }) => {
  if (!markerPosition) return null;

  return (
    <p className="mt-4">
      Selected location: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
    </p>
  );
};