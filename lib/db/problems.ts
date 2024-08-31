// File: lib/db/problems.ts

import { pool } from "./db-config";
import { Problem } from "@/lib/interfaces/Problem";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { ProblemCategory } from "@/lib/interfaces/ProblemCategories";







export async function getProblems(): Promise<(Problem & { category_name: string })[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT p.*, pc.name as category_name FROM problems p JOIN problem_categories pc ON p.category_id = pc.category_id"
  );
  return rows as (Problem & { category_name: string })[];
}









export async function getProblemById(id: number): Promise<(Problem & { category_name: string }) | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT p.*, pc.name as category_name FROM problems p JOIN problem_categories pc ON p.category_id = pc.category_id WHERE p.problem_id = ?",
    [id]
  );
  return rows[0] as (Problem & { category_name: string }) | null;
}







export async function addProblem(
  problem: Omit<Problem, "problem_id" | "created_at" | "updated_at">
): Promise<number> {
  const { name, description, category_id } = problem;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO problems (name, description, category_id) VALUES (?, ?, ?)",
    [name, description, category_id]
  );
  return result.insertId;
}









export async function updateProblem(
  id: number,
  problem: Partial<Problem>
): Promise<boolean> {
  const { name, description, category_id } = problem;
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE problems SET name = IFNULL(?, name), description = IFNULL(?, description), category_id = IFNULL(?, category_id), updated_at = CURRENT_TIMESTAMP WHERE problem_id = ?",
    [name, description, category_id, id]
  );
  return result.affectedRows > 0;
}










export async function deleteProblem(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM problems WHERE problem_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
