// File: app/api/tags/route.ts

import { NextResponse } from 'next/server';
import { getTags, getTagById, addTag, updateTag, deleteTag, Tag } from '@/lib/db/tags';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const tag = await getTagById(Number(id));
      return tag ? NextResponse.json(tag) : NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    } else {
      const tags = await getTags();
      return NextResponse.json(tags);
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const tag: Omit<Tag, 'tag_id'> = await request.json();
    const newTagId = await addTag(tag);
    return NextResponse.json({ message: 'Tag added successfully', tagId: newTagId }, { status: 201 });
  } catch (error) {
    console.error('Error adding tag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing tag id' }, { status: 400 });
  }

  try {
    const tag: Partial<Tag> = await request.json();
    const success = await updateTag(Number(id), tag);
    return success
      ? NextResponse.json({ message: 'Tag updated successfully' })
      : NextResponse.json({ error: 'Tag not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing tag id' }, { status: 400 });
  }

  try {
    const success = await deleteTag(Number(id));
    return success
      ? NextResponse.json({ message: 'Tag deleted successfully' })
      : NextResponse.json({ error: 'Tag not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}