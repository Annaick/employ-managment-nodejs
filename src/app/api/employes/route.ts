import db from "@db/index";
import { z } from 'zod';
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const createEmployeSchema = z.object({
  nom: z.string().min(3),
  nombre_de_jours: z.number().min(1),
  taux_journalier: z.number().min(1),
});



//GET: LIST

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





//POST: CREATE

export async function POST(req: Request) {
  try {
    // Vérification du Content-Type
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const validation = createEmployeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { nom, nombre_de_jours, taux_journalier } = validation.data;

    const [newEmploye] = await db('employe')
      .insert({
        nom,
        nombre_de_jours,
        taux_journalier,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      })
      .returning('*');

    
      revalidateTag('employes-list');
      console.log('refetch')

    return NextResponse.json(newEmploye, { status: 201 });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}