// File: app/api/users/route.ts

import { NextResponse } from 'next/server';
import { getUsers, getUserById, addUser, updateUser, deleteUser, User } from '@/lib/db/users';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const user = await getUserById(Number(id));
      return user ? NextResponse.json(user) : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else {
      const users = await getUsers();
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user: Omit<User, 'user_id' | 'created_at'> = await request.json();
    const newUserId = await addUser(user);
    return NextResponse.json({ message: 'User added successfully', userId: newUserId }, { status: 201 });
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  try {
    const user: Partial<User> = await request.json();
    const success = await updateUser(Number(id), user);
    return success
      ? NextResponse.json({ message: 'User updated successfully' })
      : NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  try {
    const success = await deleteUser(Number(id));
    return success
      ? NextResponse.json({ message: 'User deleted successfully' })
      : NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}