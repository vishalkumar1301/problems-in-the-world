// File: app/api/problem-instances/route.ts

import { NextResponse } from 'next/server';
import { getProblemInstances, getProblemInstanceById, addProblemInstance, updateProblemInstance, deleteProblemInstance } from '@/lib/db/problem-instances';
import { ProblemInstance } from '@/lib/interfaces/ProblemInstance';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const instance = await getProblemInstanceById(Number(id));
      return instance ? NextResponse.json(instance) : NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
    } else {
      const instances = await getProblemInstances();
      return NextResponse.json(instances);
    }
  } catch (error) {
    console.error('Error fetching problem instances:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const instance: Omit<ProblemInstance, 'instance_id' | 'created_at' | 'updated_at'> = await request.json();
    const newInstanceId = await addProblemInstance(instance);
    return NextResponse.json({ message: 'Problem instance added successfully', instanceId: newInstanceId }, { status: 201 });
  } catch (error) {
    console.error('Error adding problem instance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing instance id' }, { status: 400 });
  }

  try {
    const instance: Partial<ProblemInstance> = await request.json();
    const success = await updateProblemInstance(Number(id), instance);
    return success
      ? NextResponse.json({ message: 'Problem instance updated successfully' })
      : NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating problem instance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing instance id' }, { status: 400 });
  }

  try {
    const success = await deleteProblemInstance(Number(id));
    return success
      ? NextResponse.json({ message: 'Problem instance deleted successfully' })
      : NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting problem instance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}