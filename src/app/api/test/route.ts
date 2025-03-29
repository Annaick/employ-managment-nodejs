import { NextResponse } from 'next/server';
import db from '@db/index';
export async function GET(request: Request) {
  try {
    const employes = await db
      .select('*')
      .from('employe')
    return NextResponse.json(employes);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}