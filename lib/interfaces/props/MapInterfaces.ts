import type { LatLngExpression, LatLng, LatLngBoundsExpression } from 'leaflet';

export interface DynamicMapProps {
  center: LatLngExpression;
  zoom: number;
  markerPosition: LatLng | null;
  boundingBox: LatLngBoundsExpression | null;
  onMapClick: (latlng: LatLng) => void;
}

export interface MapUpdaterProps {
  center: LatLngExpression;
  zoom: number;
}

export interface SearchFormProps {
  onSubmit: (address: string) => void;
}

export interface SelectedLocationDisplayProps {
  markerPosition: LatLng | null;
}