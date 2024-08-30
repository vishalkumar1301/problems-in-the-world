// File: app/api/problems/route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

export async function POST(request: Request) {
  try {
    const { name, description, category } = await request.json();

    // Validate input
    if (!name || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get a connection from the pool
    const connection = await pool.getConnection();

    try {
      // Insert the new problem
      const [result] = await connection.execute(
        "INSERT INTO problems (name, description, category) VALUES (?, ?, ?)",
        [name, description, category]
      ) as [mysql.ResultSetHeader, mysql.FieldPacket[]];

      // Release the connection back to the pool
      connection.release();

      return NextResponse.json(
        { message: "Problem added successfully", problemId: result.insertId },
        { status: 201 }
      );
    } catch (error) {
      // If there's an error, release the connection and throw
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error("Error adding problem:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
