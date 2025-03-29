"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmploye = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (numEmp: number) => {
      const response = await fetch(`/api/employes?numEmp=${numEmp}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Échec de la suppression');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalider la query employes pour forcer un re-fetch
      queryClient.invalidateQueries({ queryKey: ["employes"] });
    },
    onError: (error: Error) => {
      console.error("Erreur lors de la suppression:", error);
    }
  });

  return {
    deleteEmploye: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error?.message || null
  };
};