// File: lib/db/problems.ts

import { pool } from './db-config';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Problem {
  problem_id?: number;
  name: string;
  description: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export async function getProblems(): Promise<Problem[]> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM problems');
  return rows as Problem[];
}

export async function getProblemById(id: number): Promise<Problem | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM problems WHERE problem_id = ?', [id]);
  return rows[0] as Problem | null;
}

export async function addProblem(problem: Omit<Problem, 'problem_id' | 'created_at' | 'updated_at'>): Promise<number> {
  const { name, description, category } = problem;
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO problems (name, description, category) VALUES (?, ?, ?)',
    [name, description, category]
  );
  return result.insertId;
}

export async function updateProblem(id: number, problem: Partial<Problem>): Promise<boolean> {
  const { name, description, category } = problem;
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE problems SET name = IFNULL(?, name), description = IFNULL(?, description), category = IFNULL(?, category), updated_at = CURRENT_TIMESTAMP WHERE problem_id = ?',
    [name, description, category, id]
  );
  return result.affectedRows > 0;
}

export async function deleteProblem(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM problems WHERE problem_id = ?', [id]);
  return result.affectedRows > 0;
}