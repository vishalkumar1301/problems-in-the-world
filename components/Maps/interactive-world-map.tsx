import React, { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Rectangle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapUpdaterProps {
  center: L.LatLngExpression;
  zoom: number;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const OpenSourceInteractiveMap: React.FC = () => {
  const [center, setCenter] = useState<L.LatLngExpression>([51.505, -0.09]); // Default to London
  const [zoom, setZoom] = useState(13);
  const [address, setAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [boundingBox, setBoundingBox] = useState<L.LatLngBoundsExpression | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, boundingbox } = data[0];
        const newCenter = new L.LatLng(parseFloat(lat), parseFloat(lon));
        setCenter(newCenter);
        setMarkerPosition(newCenter);
        setBoundingBox([[boundingbox[0], boundingbox[2]], [boundingbox[1], boundingbox[3]]]);
        setZoom(12); // Adjust zoom level to show the bounding box
      } else {
        alert('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      alert('Error fetching address');
    }
  };

  const handleMapClick = useCallback((e: L.LeafletMouseEvent) => {
    setMarkerPosition(e.latlng);
  }, []);

  const rectangleStyle = {
    fillColor: 'red',
    fillOpacity: 0.3,
    color: 'red',
    weight: 2,
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Interactive Map</h2>
      <form onSubmit={handleAddressSubmit} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
          whenCreated={(map) => {
            map.on('click', handleMapClick);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapUpdater center={center} zoom={zoom} />
          {markerPosition && <Marker position={markerPosition} />}
          {boundingBox && (
            <Rectangle bounds={boundingBox} pathOptions={rectangleStyle} />
          )}
        </MapContainer>
      </div>
      {markerPosition && (
        <p className="mt-4">
          Selected location: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default OpenSourceInteractiveMap;