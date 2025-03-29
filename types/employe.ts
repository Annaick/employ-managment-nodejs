export default interface Employe {
    numEmp: number;
    nom: string;
    nombre_de_jours: number;
    taux_journalier: number;
    created_at?: Date;
    updated_at?: Date;
}