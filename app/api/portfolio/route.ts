import { NextResponse } from 'next/server';
import { createPortfolio } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const portfolio = await createPortfolio(data);
    
    return NextResponse.json({ 
      success: true, 
      portfolio 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}