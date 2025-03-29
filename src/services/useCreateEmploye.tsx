"use client"

import { useState } from "react";


export const useCreateEmploye = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createEmploye = async (employeData: {
        nom: string;
        nombre_de_jours: number;
        taux_journalier: number;
    }) => {
        setIsCreating(true);
        setError(null);

        try {
            const response = await fetch('/api/employes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: employeData.nom,
                    nombre_de_jours: Number(employeData.nombre_de_jours),
                    taux_journalier: Number(employeData.taux_journalier)
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création');
            }

            return await response.json();
        } catch (err) {
            console.error("Error creating employe:", err);
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    return { createEmploye, isCreating, error };
};