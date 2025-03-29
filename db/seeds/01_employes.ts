import { Knex } from "knex";
import Employe from "../../types/employe";

const employes: Employe[] = [
    { numEmp: 1, nom: "John Doe", nombre_de_jours: 10, taux_journalier: 100 },
    { numEmp: 2, nom: "Jane Smith", nombre_de_jours: 20, taux_journalier: 150 },
    { numEmp: 3, nom: "Alice Johnson", nombre_de_jours: 15, taux_journalier: 120 },
    { numEmp: 4, nom: "Bob Brown", nombre_de_jours: 25, taux_journalier: 130 },
    { numEmp: 5, nom: "Charlie Black", nombre_de_jours: 30, taux_journalier: 140 },
    { numEmp: 6, nom: "Diana White", nombre_de_jours: 12, taux_journalier: 110 },
    { numEmp: 7, nom: "Ethan Green", nombre_de_jours: 18, taux_journalier: 160 },
    { numEmp: 8, nom: "Fiona Blue", nombre_de_jours: 22, taux_journalier: 170 },
]

export async function seed(knex: Knex): Promise<void> {

    await knex("employe").del();

    await knex("employe").insert(employes);
};
