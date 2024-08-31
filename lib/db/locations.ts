// File: lib/db/locations.ts

import { pool } from "./db-config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Location } from "../interfaces/Location";

export async function getLocations(): Promise<Location[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM locations");
  return rows as Location[];
}

export async function getLocationById(id: number): Promise<Location | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM locations WHERE location_id = ?",
    [id]
  );
  return rows[0] as Location | null;
}

export async function addLocation(
  location: Omit<Location, "location_id">
): Promise<number> {
  const { name, type, parent_location_id } = location;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO locations (name, type, parent_location_id) VALUES (?, ?, ?)",
    [name, type, parent_location_id]
  );
  return result.insertId;
}

export async function updateLocation(
  id: number,
  location: Partial<Location>
): Promise<boolean> {
  const { name, type, parent_location_id } = location;
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE locations SET name = IFNULL(?, name), type = IFNULL(?, type), parent_location_id = IFNULL(?, parent_location_id) WHERE location_id = ?",
    [name, type, parent_location_id, id]
  );
  return result.affectedRows > 0;
}

export async function deleteLocation(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM locations WHERE location_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
