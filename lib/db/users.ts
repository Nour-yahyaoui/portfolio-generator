// lib/db/users.ts
import { neon } from '@neondatabase/serverless';
import { hashPassword, comparePassword } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

export interface User {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  created_at: Date;
}

// Create a new user
export async function createUser(email: string, password: string, name: string) {
  // Check if user already exists
  const existing = await sql`
    SELECT id FROM users WHERE email = ${email}
  `;
  
  if (existing.length > 0) {
    throw new Error('User already exists');
  }
  
  const passwordHash = await hashPassword(password);
  
  const result = await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${passwordHash}, ${name})
    RETURNING id, email, name, created_at
  `;
  
  return result[0];
}

// Find user by email
export async function findUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return result[0] || null;
}

// Find user by id
export async function findUserById(id: number) {
  const result = await sql`
    SELECT id, email, name, created_at FROM users WHERE id = ${id}
  `;
  return result[0] || null;
}

// Validate user credentials
export async function validateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  const isValid = await comparePassword(password, user.password_hash);
  
  if (!isValid) {
    return null;
  }
  
  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
}