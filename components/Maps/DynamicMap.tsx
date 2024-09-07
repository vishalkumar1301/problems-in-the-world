import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Rectangle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { setupLeafletDefaultIcon } from '@/utils/leaflet-utils';
import { DynamicMapProps, MapUpdaterProps } from '@/interfaces/props/MapInterfaces';

setupLeafletDefaultIcon();

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const DynamicMap: React.FC<DynamicMapProps> = ({
  center,
  zoom,
  markerPosition,
  boundingBox,
  onMapClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', (e: L.LeafletMouseEvent) => onMapClick(e.latlng));
    }
  }, [onMapClick]);

  const rectangleStyle = {
    fillColor: 'red',
    fillOpacity: 0.3,
    color: 'red',
    weight: 2,
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
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
  );
};

export default DynamicMap;