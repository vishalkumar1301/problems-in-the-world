// File: app/api/problem-updates/route.ts

import { NextResponse } from "next/server";
import {
  getProblemUpdates,
  getProblemUpdateById,
  addProblemUpdate,
  updateProblemUpdate,
  deleteProblemUpdate,
  ProblemUpdate,
} from "@/lib/db/problem-updates";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const update = await getProblemUpdateById(Number(id));
      return update
        ? NextResponse.json(update)
        : NextResponse.json(
            { error: "Problem update not found" },
            { status: 404 }
          );
    } else {
      const updates = await getProblemUpdates();
      return NextResponse.json(updates);
    }
  } catch (error) {
    console.error("Error fetching problem updates:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const update: Omit<ProblemUpdate, "update_id" | "created_at"> =
      await request.json();
    const newUpdateId = await addProblemUpdate(update);
    return NextResponse.json(
      { message: "Problem update added successfully", updateId: newUpdateId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding problem update:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing update id" }, { status: 400 });
  }

  try {
    const update: Partial<ProblemUpdate> = await request.json();
    const success = await updateProblemUpdate(Number(id), update);
    return success
      ? NextResponse.json({ message: "Problem update updated successfully" })
      : NextResponse.json(
          { error: "Problem update not found" },
          { status: 404 }
        );
  } catch (error) {
    console.error("Error updating problem update:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing update id" }, { status: 400 });
  }

  try {
    const success = await deleteProblemUpdate(Number(id));
    return success
      ? NextResponse.json({ message: "Problem update deleted successfully" })
      : NextResponse.json(
          { error: "Problem update not found" },
          { status: 404 }
        );
  } catch (error) {
    console.error("Error deleting problem update:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
