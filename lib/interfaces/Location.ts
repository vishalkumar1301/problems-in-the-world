import { LocationType } from '../enums/LocationType';

export interface Location {
  location_id?: number;
  name: string;
  type: LocationType;
  parent_location_id?: number;
}