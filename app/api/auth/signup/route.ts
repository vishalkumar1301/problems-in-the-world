import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { User } from '@/lib/interfaces/User';
import { SignupCredentials } from '@/lib/interfaces/SignupCredentials';
import { addUser, getUserByUsername, getUserByEmail } from '@/lib/db/users';








export async function POST(request: Request) {
  try {
    const credentials: SignupCredentials = await request.json();
    const { username, email, password } = credentials;

    // Check if username already exists
    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add user to database
    const newUser = await addUser({
      username,
      email,
      password,
    });

    // Create JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Prepare user object to return (excluding password)
    const userResponse: Omit<User, 'password_hash' | 'is_admin' | 'created_at'> = {
      user_id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    return NextResponse.json({ user: userResponse, token }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}