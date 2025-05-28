import { useQuery } from "@tanstack/react-query";

const endpoint = `${process.env.API_BASE_PATH}/essential-oil`;

export const queryKey = {
  all: ["essential-oil"] as const,
  lists: () => [...queryKey.all, "list"] as const,
  list: (query?: Record<string, unknown>) =>
    [...queryKey.lists(), query ?? ""] as const,
  shows: () => [...queryKey.all, "show"] as const,
  show: (id: number) => [...queryKey.shows(), id] as const,
};

export interface EssentialOilVO {
  id: number;
  name: string;
  note: string;
  tags: Array<{
    id: string | number;
    name: string;
    color: string;
  }>;
  personalTags: Array<{
    id: string | number;
    name: string;
    color: string;
  }>;
}

const fetchEssentialOilList = async (): Promise<Array<EssentialOilVO>> => {
  const response = await fetch(`${endpoint}`);
  const data = await response.json();
  return data;
};

const fetchEssentialOilDetail = async (
  id: string | number
): Promise<EssentialOilVO | undefined> => {
  const response = await fetch(`${endpoint}/${id}`);
  const data = await response.json();
  return data;
};

const useGetEssentialOilList = () => {
  return useQuery({
    queryKey: queryKey.list(),
    queryFn: () => fetchEssentialOilList(),
    select: (data) => {
      return data;
    },
  });
};

const useGetEssentialOilDetail = (id?: number) => {
  const numericId = typeof id === "string" ? Number(id) : id;
  return useQuery({
    queryKey: queryKey.show(numericId!),
    queryFn: () => fetchEssentialOilDetail(id!),
    select: (data) => {
      return data;
    },
    enabled: !!id,
  });
};

export { useGetEssentialOilList, useGetEssentialOilDetail };
