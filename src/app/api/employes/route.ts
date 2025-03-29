import db from "@db/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filters = Object.fromEntries(searchParams.entries());


    const page = filters.page ? parseInt(filters.page as string) : 1;
    const perPage = filters.perPage ? parseInt(filters.perPage as string) : 5;

    // Construction de la requête de base
    let query = db.select('*').from('employe');


    if (filters.search) {
      query = query.whereILike('nom', `%${filters.search}%`);
    }


    const offset = (page - 1) * perPage;

    const employes = await query.offset(offset).limit(perPage);


    let totalQuery = db.count('* as count').from('employe');
    
    if (filters.search) {
      totalQuery = totalQuery.whereILike('nom', `%${filters.search}%`);
    }

    const totalResult = await totalQuery.first();
    const total = totalResult ? parseInt(totalResult.count as string) : 0;
    const totalPages = Math.ceil(total / perPage);

    return NextResponse.json({
      data: employes,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}