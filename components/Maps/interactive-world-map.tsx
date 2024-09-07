import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SearchForm } from './SearchForm';
import { SelectedLocationDisplay } from './SelectedLocationDisplay';
import type { LatLngExpression, LatLng, LatLngBoundsExpression } from 'leaflet';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const InteractiveWorldMap: React.FC = () => {
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Interactive Map</h2>
      <SearchForm onSubmit={handleAddressSubmit} />
      <DynamicMap
        center={center}
        zoom={zoom}
        markerPosition={markerPosition}
        boundingBox={boundingBox}
        onMapClick={(latlng: LatLng) => setMarkerPosition(latlng)}
      />
      <SelectedLocationDisplay markerPosition={markerPosition} />
    </div>
  );
};

export default InteractiveWorldMap;