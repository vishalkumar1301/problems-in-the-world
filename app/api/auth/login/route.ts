



import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { User } from '@/lib/interfaces/User';
import { getUserByUsername } from '@/lib/db/users';
import { LoginCredentials } from '@/lib/interfaces/LoginCredentials';






export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json();
    const { username, password } = credentials;

    // Get user from database
    const user = await getUserByUsername(username);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Prepare user object to return (excluding password)
    const userResponse: Omit<User, 'password_hash' | 'is_admin' | 'created_at'> = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };

    return NextResponse.json({ user: userResponse, token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}