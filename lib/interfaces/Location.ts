export interface Location {
  location_id?: number;
  name: string;
  type: 'CITY' | 'STATE' | 'COUNTRY' | 'REGION';
  parent_location_id?: number;
}