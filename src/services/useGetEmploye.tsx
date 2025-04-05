"use client"

import { useQuery } from "@tanstack/react-query";
import Employe from "@/types/employe";
import { Filter } from "@/types/filter";
import { Paginate } from "@/types/paginate";

const fetchEmployes = async (filter: Filter) => {
  const response = await fetch(
    `/api/employes?search=${filter.search}&page=${filter.page}&perPage=${filter.perPage}`,
    {
      next: {
        tags: ["employes-list"],
        revalidate: 0
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des employés");
  }
  return response.json();
};

export const useGetEmployes = (filter: Filter) => {
  return useQuery<Paginate<Employe[]>, Error>({
    queryKey: ["employes", filter.search, filter.page, filter.perPage],
    queryFn: () => fetchEmployes(filter),
    staleTime: 0,
  });
};