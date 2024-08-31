// File: lib/db/problem-instances.ts

import { pool } from './db-config';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ProblemInstance {
  instance_id?: number;
  problem_id: number;
  location_id: number;
  status: 'ONGOING' | 'IMPROVING' | 'WORSENING' | 'RESOLVED';
  severity: number;
  reported_by?: number;
  created_at?: string;
  updated_at?: string;
}

export async function getProblemInstances(): Promise<ProblemInstance[]> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM problem_instances');
  return rows as ProblemInstance[];
}

export async function getProblemInstanceById(id: number): Promise<ProblemInstance | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM problem_instances WHERE instance_id = ?', [id]);
  return rows[0] as ProblemInstance | null;
}

export async function addProblemInstance(instance: Omit<ProblemInstance, 'instance_id' | 'created_at' | 'updated_at'>): Promise<number> {
  const { problem_id, location_id, status, severity, reported_by } = instance;
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO problem_instances (problem_id, location_id, status, severity, reported_by) VALUES (?, ?, ?, ?, ?)',
    [problem_id, location_id, status, severity, reported_by]
  );
  return result.insertId;
}

export async function updateProblemInstance(id: number, instance: Partial<ProblemInstance>): Promise<boolean> {
  const { problem_id, location_id, status, severity, reported_by } = instance;
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE problem_instances SET problem_id = IFNULL(?, problem_id), location_id = IFNULL(?, location_id), status = IFNULL(?, status), severity = IFNULL(?, severity), reported_by = IFNULL(?, reported_by), updated_at = CURRENT_TIMESTAMP WHERE instance_id = ?',
    [problem_id, location_id, status, severity, reported_by, id]
  );
  return result.affectedRows > 0;
}

export async function deleteProblemInstance(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM problem_instances WHERE instance_id = ?', [id]);
  return result.affectedRows > 0;
}