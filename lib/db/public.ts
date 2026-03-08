// lib/db/public.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Get public portfolio by username and portfolio name
export async function getPublicPortfolio(username: string, portfolioname: string) {
  try {
    // First find the user by username (name field)
    const user = await sql`
      SELECT id, name, email FROM users WHERE LOWER(name) = LOWER(${username})
    `;
    
    if (user.length === 0) return null;
    
    // Then find the portfolio by title and user_id
    const portfolio = await sql`
      SELECT * FROM portfolios 
      WHERE LOWER(title) = LOWER(${portfolioname}) 
      AND user_id = ${user[0].id}
    `;
    
    if (portfolio.length === 0) return null;
    
    // Get all related data
    const [projects, experience, education] = await Promise.all([
      sql`SELECT * FROM projects WHERE portfolio_id = ${portfolio[0].id} ORDER BY "order" ASC`,
      sql`SELECT * FROM experience WHERE portfolio_id = ${portfolio[0].id} ORDER BY start_date DESC`,
      sql`SELECT * FROM education WHERE portfolio_id = ${portfolio[0].id} ORDER BY start_date DESC`
    ]);
    
    return {
      user: user[0],
      portfolio: portfolio[0],
      projects,
      experience,
      education
    };
  } catch (error) {
    console.error('Error fetching public portfolio:', error);
    return null;
  }
}