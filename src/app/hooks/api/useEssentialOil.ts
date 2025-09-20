import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "./request";
import { ApiEssentialOilDto, EssentialOil } from "./types";

export type { EssentialOil } from "./types";

const endpoint = "/essential-oil";

export const queryKey = {
  all: ["essential-oil"] as const,
  lists: () => [...queryKey.all, "list"] as const,
  list: (query?: Record<string, unknown>) =>
    [...queryKey.lists(), query ?? ""] as const,
  shows: () => [...queryKey.all, "show"] as const,
  show: (id: number | string) => [...queryKey.shows(), id] as const,
};

export type EssentialOilSummary = EssentialOil;

export type EssentialOilCreateInput = {
  name: string;
  englishName: string;
  scientificName?: string;
  note?: string;
  tags?: number[];
  personalTags?: number[];
};

export type EssentialOilUpdateInput = Partial<EssentialOilCreateInput>;

const fetchEssentialOilList = async (): Promise<EssentialOilSummary[]> => {
  const response = await request.get<any, ApiEssentialOilDto[]>(`${endpoint}`);
  return response;
};

const fetchEssentialOilDetail = async (
  id: number | string
): Promise<EssentialOil> => {
  const response = await request.get<any, ApiEssentialOilDto>(
    `${endpoint}/${id}`
  );
  return response;
};

const createEssentialOil = async (
  payload: EssentialOilCreateInput
): Promise<EssentialOil> => {
  const response = await request.post<any, ApiEssentialOilDto>(
    `${endpoint}`,
    payload
  );
  return response;
};

const updateEssentialOil = async ({
  id,
  payload,
}: {
  id: number | string;
  payload: EssentialOilUpdateInput;
}): Promise<EssentialOil> => {
  const response = await request.put<any, ApiEssentialOilDto>(
    `${endpoint}/${id}`,
    payload
  );
  return response;
};

const deleteEssentialOil = async (id: number | string) => {
  await request.delete(`${endpoint}/${id}`);
};

export const useGetEssentialOilList = () => {
  return useQuery({
    queryKey: queryKey.list(),
    queryFn: fetchEssentialOilList,
  });
};

export const useGetEssentialOilDetail = (id?: number | string) => {
  const numericId = typeof id === "string" ? Number(id) : id;
  return useQuery({
    queryKey: numericId ? queryKey.show(numericId) : queryKey.show("unknown"),
    queryFn: () => fetchEssentialOilDetail(numericId!),
    enabled: typeof numericId === "number" && !Number.isNaN(numericId),
  });
};

export const useCreateEssentialOil = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEssentialOil,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKey.lists() });
      queryClient.invalidateQueries({ queryKey: queryKey.show(data.id) });
    },
  });
};

export const useUpdateEssentialOil = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEssentialOil,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: queryKey.show(id) });
      queryClient.invalidateQueries({ queryKey: queryKey.lists() });
    },
  });
};

export const useDeleteEssentialOil = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEssentialOil,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKey.lists() });
      queryClient.removeQueries({ queryKey: queryKey.show(id) });
    },
  });
};
