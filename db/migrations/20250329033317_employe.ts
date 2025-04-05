import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("employe", (table) => {
        table.increments("numEmp").primary();
        table.string("nom").notNullable();
        table.integer("nombre_de_jours").notNullable();
        table.bigInteger("taux_journalier").notNullable();
        table.timestamps(true, true);
    }
    );
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("employe");
}

