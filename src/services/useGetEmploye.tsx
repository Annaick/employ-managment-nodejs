"use client"

import Employe from "@/types/employe";
import { Filter } from "@/types/filter";
import { Paginate } from "@/types/paginate";
import { useEffect, useState } from "react";

export const useGetEmployes = (filter: Filter) => {
    const [employes, setEmployes] = useState<Paginate<Employe[]> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchEmployes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/employes?search=" + filter.search + "&page=" + filter.page + "&perPage=" + filter.perPage);
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
    }, [filter.search, filter.perPage, filter.page]);
    
    return { employes, loading, error };
}