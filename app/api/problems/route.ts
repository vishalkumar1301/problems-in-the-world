// File: app/api/problems/route.ts

import { NextResponse } from 'next/server';
import { Problem } from '@/lib/interfaces/Problem';
import { getProblems, addProblem, updateProblem, deleteProblem } from '@/lib/db/problems';

export async function GET() {
  try {
    const problems = await getProblems();
    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const problem: Omit<Problem, 'problem_id' | 'created_at' | 'updated_at'> = await request.json();
    const newProblemId = await addProblem(problem);
    return NextResponse.json({ message: 'Problem added successfully', problemId: newProblemId }, { status: 201 });
  } catch (error) {
    console.error('Error adding problem:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Similarly, you would implement PUT and DELETE methods using updateProblem and deleteProblem functions

export async function PUT(request: Request) {
  try {
    const { id, ...problemData } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Problem ID is required' }, { status: 400 });
    }
    const success = await updateProblem(id, problemData);
    if (success) {
      return NextResponse.json({ message: 'Problem updated successfully' });
    } else {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating problem:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Problem ID is required' }, { status: 400 });
    }
    const success = await deleteProblem(id);
    if (success) {
      return NextResponse.json({ message: 'Problem deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting problem:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

