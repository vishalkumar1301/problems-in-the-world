// File: lib/db/users.ts

import bcrypt from 'bcrypt';
import { pool } from "./db-config";
import { User } from "@/lib/interfaces/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { SignupCredentials } from "@/lib/interfaces/SignupCredentials";








export async function getUsers(): Promise<User[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users");
  return rows as User[];
}







export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE user_id = ?",
    [id]
  );
  return rows[0] as User | null;
}








export async function addUser(
  user: Omit<SignupCredentials, "confirmPassword">
): Promise<number> {
  const { username, email, password } = user;
  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, password_hash]
  );
  return result.insertId;
}








export async function updateUser(
  id: number,
  user: Partial<User>
): Promise<boolean> {
  const { username, email, password_hash, is_admin } = user;
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE users SET username = IFNULL(?, username), email = IFNULL(?, email), password_hash = IFNULL(?, password_hash), is_admin = IFNULL(?, is_admin) WHERE user_id = ?",
    [username, email, password_hash, is_admin, id]
  );
  return result.affectedRows > 0;
}








export async function deleteUser(id: number): Promise<boolean> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM users WHERE user_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}







export async function getUserByUsername(username: string): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  return rows[0] as User | null;
}







export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] as User | null;
}
