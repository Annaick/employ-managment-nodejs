import db from "@db/index";
import { NextResponse } from "next/server";

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