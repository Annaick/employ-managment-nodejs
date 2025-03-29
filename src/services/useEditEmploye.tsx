"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EmployeData = {
  numEmp: number;
  nom: string;
  nombre_de_jours: number;
  taux_journalier: number;
};

export const useEditEmploye = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (employeData: EmployeData) => {
      const response = await fetch('/api/employes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numEmp: Number(employeData.numEmp),
          nom: employeData.nom,
          nombre_de_jours: Number(employeData.nombre_de_jours),
          taux_journalier: Number(employeData.taux_journalier)
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification');
      }

      return await response.json();
    },
    onSuccess: () => {
      // Invalider la query employes-list pour forcer un re-fetch
      queryClient.invalidateQueries({ queryKey: ["employes"] });
      toast.success("Employé(e) modifié(e) avec succès");
    },
    onError: (error: Error) => {
      console.error("Error editing employe:", error);
        toast.error("Erreur lors de la modification de l'employé");
    }
  });

  return {
    editEmploye: mutation.mutateAsync,
    isEditing: mutation.isPending,
    error: mutation.error?.message || null
  };
};