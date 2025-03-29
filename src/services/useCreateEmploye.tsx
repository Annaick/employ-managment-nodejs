"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EmployeData = {
  nom: string;
  nombre_de_jours: number;
  taux_journalier: number;
};

export const useCreateEmploye = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (employeData: EmployeData) => {
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

      const employe = await response.json();
      toast.success(employe.nom + " a été ajouté(e) avec succès")
      return employe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employes"] });
    },
    onError: (error: Error) => {
      console.error("Error creating employe:", error);
      toast.error("Erreur lors de la création de l'employé");
    }
  });

  return {
    createEmploye: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error?.message || null
  };
};