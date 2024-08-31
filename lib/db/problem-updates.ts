// File: lib/db/problem-updates.ts

import { pool } from "./db-config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { ProblemUpdate } from "@/lib/interfaces/ProblemUpdate";









export async function getProblemUpdates(): Promise<ProblemUpdate[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_updates"
  );
  return rows as ProblemUpdate[];
}








export async function getProblemUpdateById(
  id: number
): Promise<ProblemUpdate | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_updates WHERE update_id = ?",
    [id]
  );
  return rows[0] as ProblemUpdate | null;
}









export async function addProblemUpdate(
  update: Omit<ProblemUpdate, "update_id" | "created_at">
): Promise<number> {
  const { instance_id, user_id, update_text } = update;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO problem_updates (instance_id, user_id, update_text) VALUES (?, ?, ?)",
    [instance_id, user_id, update_text]
  );
  return result.insertId;
}









export async function updateProblemUpdate(
  id: number,
  update: Partial<ProblemUpdate>
): Promise<boolean> {
  const { instance_id, user_id, update_text } = update;
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE problem_updates SET instance_id = IFNULL(?, instance_id), user_id = IFNULL(?, user_id), update_text = IFNULL(?, update_text) WHERE update_id = ?",
    [instance_id, user_id, update_text, id]
  );
  return result.affectedRows > 0;
}








export async function deleteProblemUpdate(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM problem_updates WHERE update_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
