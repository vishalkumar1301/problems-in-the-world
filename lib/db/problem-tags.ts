// File: lib/db/problem-tags.ts

import { pool } from "./db-config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { ProblemTag } from "@/lib/interfaces/ProblemTag";







export async function getProblemTags(): Promise<ProblemTag[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_tags"
  );
  return rows as ProblemTag[];
}









export async function getProblemTagsByProblemId(
  problemId: number
): Promise<ProblemTag[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_tags WHERE problem_id = ?",
    [problemId]
  );
  return rows as ProblemTag[];
}









export async function getProblemTagsByTagId(
  tagId: number
): Promise<ProblemTag[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM problem_tags WHERE tag_id = ?",
    [tagId]
  );
  return rows as ProblemTag[];
}









export async function addProblemTag(problemTag: ProblemTag): Promise<boolean> {
  const { problem_id, tag_id } = problemTag;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO problem_tags (problem_id, tag_id) VALUES (?, ?)",
    [problem_id, tag_id]
  );
  return result.affectedRows > 0;
}









export async function deleteProblemTag(
  problemId: number,
  tagId: number
): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM problem_tags WHERE problem_id = ? AND tag_id = ?",
    [problemId, tagId]
  );
  return result.affectedRows > 0;
}








export async function deleteAllProblemTagsByProblemId(
  problemId: number
): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM problem_tags WHERE problem_id = ?",
    [problemId]
  );
  return result.affectedRows > 0;
}








export async function deleteAllProblemTagsByTagId(
  tagId: number
): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM problem_tags WHERE tag_id = ?",
    [tagId]
  );
  return result.affectedRows > 0;
}
