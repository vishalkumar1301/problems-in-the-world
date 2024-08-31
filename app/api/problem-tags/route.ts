// File: app/api/problem-tags/route.ts

import { NextResponse } from 'next/server';
import {
  getProblemTags,
  getProblemTagsByProblemId,
  getProblemTagsByTagId,
  addProblemTag,
  deleteProblemTag,
  deleteAllProblemTagsByProblemId,
  deleteAllProblemTagsByTagId,
  ProblemTag
} from '@/lib/db/problem-tags';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const problemId = searchParams.get('problemId');
  const tagId = searchParams.get('tagId');

  try {
    if (problemId) {
      const problemTags = await getProblemTagsByProblemId(Number(problemId));
      return NextResponse.json(problemTags);
    } else if (tagId) {
      const problemTags = await getProblemTagsByTagId(Number(tagId));
      return NextResponse.json(problemTags);
    } else {
      const allProblemTags = await getProblemTags();
      return NextResponse.json(allProblemTags);
    }
  } catch (error) {
    console.error('Error fetching problem tags:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const problemTag: ProblemTag = await request.json();
    const success = await addProblemTag(problemTag);
    return success
      ? NextResponse.json({ message: 'Problem tag added successfully' }, { status: 201 })
      : NextResponse.json({ error: 'Failed to add problem tag' }, { status: 400 });
  } catch (error) {
    console.error('Error adding problem tag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const problemId = searchParams.get('problemId');
  const tagId = searchParams.get('tagId');

  if (!problemId && !tagId) {
    return NextResponse.json({ error: 'Missing problemId or tagId' }, { status: 400 });
  }

  try {
    let success: boolean;
    if (problemId && tagId) {
      success = await deleteProblemTag(Number(problemId), Number(tagId));
    } else if (problemId) {
      success = await deleteAllProblemTagsByProblemId(Number(problemId));
    } else {
      success = await deleteAllProblemTagsByTagId(Number(tagId));
    }

    return success
      ? NextResponse.json({ message: 'Problem tag(s) deleted successfully' })
      : NextResponse.json({ error: 'Problem tag(s) not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting problem tag(s):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}