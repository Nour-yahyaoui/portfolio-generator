// lib/auth.ts
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SALT_ROUNDS = 10;

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Simple session management (using cookies)
export async function createSession(userId: number) {
  const cookieStore = await cookies();
  // Store user ID in cookie (simple string, not JWT)
  cookieStore.set('user_id', userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Get current user from cookie
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  
  if (!userId) {
    return null;
  }
  
  return parseInt(userId);
}

// Require authentication (redirect if not logged in)
export async function requireAuth() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect('/login');
  }
  return userId;
}

// Logout (clear cookie)
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('user_id');
}