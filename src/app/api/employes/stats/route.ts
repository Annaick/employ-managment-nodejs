import { NextRequest, NextResponse } from "next/server";
import db from "@db/index";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');

    const salaryStatsQuery = db
      .select(
        db.raw('SUM(nombre_de_jours * taux_journalier) as total_salaires'),
        db.raw('MAX(nombre_de_jours * taux_journalier) as salaire_max'),
        db.raw('MIN(nombre_de_jours * taux_journalier) as salaire_min')
      )
      .from('employe');

    if (search) {
      salaryStatsQuery.whereILike('nom', `%${search}%`);
    }

    const salaryStats = await salaryStatsQuery.first();

    return NextResponse.json({
      statistics: {
        totalSalaries: salaryStats?.total_salaires || 0,
        maxSalary: salaryStats?.salaire_max || 0,
        minSalary: salaryStats?.salaire_min || 0
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