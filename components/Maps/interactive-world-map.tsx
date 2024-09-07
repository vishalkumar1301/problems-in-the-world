import React from 'react';
import dynamic from 'next/dynamic';
import { SelectedLocationDisplay } from './SelectedLocationDisplay';
import { useMapContext } from "@/contexts/MapContext";

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const InteractiveWorldMap: React.FC = () => {
  const { center, zoom, markerPosition, boundingBox, setMarkerPosition } = useMapContext();

  return (
    <div className="w-full h-full">
      <DynamicMap
        center={center}
        zoom={zoom}
        markerPosition={markerPosition}
        boundingBox={boundingBox}
        onMapClick={(latlng) => setMarkerPosition(latlng)}
      />
      <SelectedLocationDisplay markerPosition={markerPosition} />
    </div>
  );
};

export default InteractiveWorldMap;