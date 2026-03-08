// lib/db.ts (update existing functions)
import { neon } from '@neondatabase/serverless';
import { requireAuth } from './auth';

const sql = neon(process.env.DATABASE_URL!);

// Get all portfolios for current user
export async function getAllPortfolios() {
  const userId = await requireAuth();
  
  const result = await sql`
    SELECT * FROM portfolios 
    WHERE user_id = ${userId}
    ORDER BY id DESC
  `;
  return result;
}

// Get a single portfolio by ID (with user check)
export async function getPortfolio(id: number) {
  const userId = await requireAuth();
  
  const result = await sql`
    SELECT * FROM portfolios 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return result[0] || null;
}

// Create a new portfolio with user_id
export async function createPortfolio(data: any) {
  const userId = await requireAuth();
  
  const result = await sql`
    INSERT INTO portfolios (
      user_id, title, subtitle, logo_url, profile_image_url,
      bio, email, phone, location, skills, social_links
    ) VALUES (
      ${userId},
      ${data.title}, 
      ${data.subtitle || null}, 
      ${data.logoUrl || null}, 
      ${data.profileImageUrl || null},
      ${data.bio || null}, 
      ${data.email || null}, 
      ${data.phone || null},
      ${data.location || null}, 
      ${data.skills || []}, 
      ${JSON.stringify(data.socialLinks || {})}
    ) RETURNING *
  `;
  return result[0];
}

// Get full portfolio with all related data (with user check)
export async function getFullPortfolio(id: number) {
  const userId = await requireAuth();
  
  // Check if portfolio belongs to user
  const portfolio = await sql`
    SELECT * FROM portfolios 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  
  if (portfolio.length === 0) return null;

  const [projects, experience, education] = await Promise.all([
    sql`SELECT * FROM projects WHERE portfolio_id = ${id} ORDER BY "order" ASC`,
    sql`SELECT * FROM experience WHERE portfolio_id = ${id} ORDER BY start_date DESC`,
    sql`SELECT * FROM education WHERE portfolio_id = ${id} ORDER BY start_date DESC`
  ]);

  return {
    portfolio: portfolio[0],
    projects,
    experience,
    education
  };
}