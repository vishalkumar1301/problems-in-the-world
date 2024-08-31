// File: lib/db/problem-categories.ts

import { pool } from "./db-config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { ProblemCategory } from "@/lib/interfaces/ProblemCategories";







export async function getProblemCategories(): Promise<ProblemCategory[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_categories"
  );
  return rows as ProblemCategory[];
}







export async function getProblemCategoryById(
  id: number
): Promise<ProblemCategory | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_categories WHERE category_id = ?",
    [id]
  );
  return rows[0] as ProblemCategory | null;
}






export async function addProblemCategory(
  category: Omit<ProblemCategory, "category_id">
): Promise<number> {
  const { name, description } = category;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO problem_categories (name, description) VALUES (?, ?)",
    [name, description]
  );
  return result.insertId;
}







export async function updateProblemCategory(
  id: number,
  category: Partial<ProblemCategory>
): Promise<boolean> {
  const { name, description } = category;
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE problem_categories SET name = IFNULL(?, name), description = IFNULL(?, description) WHERE category_id = ?",
    [name, description, id]
  );
  return result.affectedRows > 0;
}







export async function deleteProblemCategory(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM problem_categories WHERE category_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
