// File: app/api/problem-categories/route.ts

import { NextResponse } from "next/server";
import {
  getProblemCategories,
  getProblemCategoryById,
  addProblemCategory,
  updateProblemCategory,
  deleteProblemCategory,
} from "@/lib/db/problem-categories";
import { ProblemCategory } from "@/lib/interfaces/ProblemCategories";






export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const category = await getProblemCategoryById(Number(id));
      return category
        ? NextResponse.json(category)
        : NextResponse.json(
            { error: "Problem category not found" },
            { status: 404 }
          );
    } else {
      const categories = await getProblemCategories();
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error("Error fetching problem categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}






export async function POST(request: Request) {
  try {
    const category: Omit<ProblemCategory, "category_id"> = await request.json();
    const newCategoryId = await addProblemCategory(category);
    return NextResponse.json(
      {
        message: "Problem category added successfully",
        categoryId: newCategoryId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding problem category:", error);
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
    return NextResponse.json({ error: "Missing category id" }, { status: 400 });
  }

  try {
    const category: Partial<ProblemCategory> = await request.json();
    const success = await updateProblemCategory(Number(id), category);
    return success
      ? NextResponse.json({ message: "Problem category updated successfully" })
      : NextResponse.json(
          { error: "Problem category not found" },
          { status: 404 }
        );
  } catch (error) {
    console.error("Error updating problem category:", error);
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
    return NextResponse.json({ error: "Missing category id" }, { status: 400 });
  }

  try {
    const success = await deleteProblemCategory(Number(id));
    return success
      ? NextResponse.json({ message: "Problem category deleted successfully" })
      : NextResponse.json(
          { error: "Problem category not found" },
          { status: 404 }
        );
  } catch (error) {
    console.error("Error deleting problem category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
