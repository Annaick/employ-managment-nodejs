"use client"

import Employe from "@/types/employe";
import { useEffect, useState } from "react";

export const useGetEmployes = () => {
    const [employes, setEmployes] = useState<Employe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchEmployes = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/employes");
            const data = await response.json();
            setEmployes(data);
        } catch (error) {
            console.error("Error fetching employes:", error);
            setError("Erreur lors de la récupération des employés");
        } finally {
            setLoading(false);
        }
        };
    
        fetchEmployes();
    }, []);
    
    return { employes, loading, error };
}