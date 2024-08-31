// File: lib/db/tags.ts

import { pool } from "./db-config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Tag } from "@/lib/interfaces/Tag";








export async function getTags(): Promise<Tag[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM tags");
  return rows as Tag[];
}









export async function getTagById(id: number): Promise<Tag | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM tags WHERE tag_id = ?",
    [id]
  );
  return rows[0] as Tag | null;
}







export async function addTag(tag: Omit<Tag, "tag_id">): Promise<number> {
  const { name } = tag;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO tags (name) VALUES (?)",
    [name]
  );
  return result.insertId;
}









export async function updateTag(
  id: number,
  tag: Partial<Tag>
): Promise<boolean> {
  const { name } = tag;
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE tags SET name = IFNULL(?, name) WHERE tag_id = ?",
    [name, id]
  );
  return result.affectedRows > 0;
}








export async function deleteTag(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM tags WHERE tag_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
