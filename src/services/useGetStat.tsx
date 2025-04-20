"use client"

import { useQuery } from "@tanstack/react-query";
import Stat from "@/types/stat";

const fetchStats = async () => {
  const response = await fetch(
    `/api/employes/stats`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des stats");
  }
  return response.json();
};

export const useGetStats = () => {
  return useQuery<Stat, Error>({
    queryKey: ["employes"],
    queryFn: () => fetchStats(),
  });
};