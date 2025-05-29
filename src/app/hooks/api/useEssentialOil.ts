import { useQuery } from "@tanstack/react-query";
import request from './request'
const endpoint = `/essential-oil`;

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

const fetchEssentialOilList = async () => {
  const response = await request.get<any, Promise<Array<EssentialOilVO>>>(`${endpoint}`);
  return response
};

const fetchEssentialOilDetail = async (
  id: string | number
) => {
  const response = await request.get<any, Promise<EssentialOilVO>>(`${endpoint}/${id}`);
  return response
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
