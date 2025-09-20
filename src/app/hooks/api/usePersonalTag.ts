import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import request from "./request";
import { queryKey as essentialOilQueryKey } from "./useEssentialOil";
import { ApiPersonalTagDto, PersonalTag } from "./types";

export type { PersonalTag } from "./types";

const endpoint = "/personal/tag";

export const queryKey = {
  all: ["personal-tag"] as const,
  lists: () => [...queryKey.all, "list"] as const,
  list: (query?: unknown) => [...queryKey.lists(), query ?? ""] as const,
  shows: () => [...queryKey.all, "show"] as const,
  show: (id: number | string) => [...queryKey.shows(), id] as const,
};

export type PersonalTagInput = {
  name: string;
  color: string;
};

const fetchPersonalTags = async (): Promise<PersonalTag[]> => {
  const response = await request.get<any, ApiPersonalTagDto[]>(`${endpoint}`);
  return response;
};

const createPersonalTag = async (
  payload: PersonalTagInput
): Promise<PersonalTag> => {
  const response = await request.post<any, ApiPersonalTagDto>(
    `${endpoint}`,
    payload
  );
  return response;
};

const updatePersonalTag = async ({
  id,
  payload,
}: {
  id: number | string;
  payload: Partial<PersonalTagInput>;
}): Promise<PersonalTag> => {
  const response = await request.put<any, ApiPersonalTagDto>(
    `${endpoint}/${id}`,
    payload
  );
  return response;
};

const deletePersonalTag = async (id: number | string) => {
  await request.delete(`${endpoint}/${id}`);
};

const invalidateDependentQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: queryKey.lists() });
  queryClient.invalidateQueries({ queryKey: essentialOilQueryKey.all });
};

export const useGetPersonalTagList = () =>
  useQuery({
    queryKey: queryKey.list(),
    queryFn: fetchPersonalTags,
  });

export const useCreatePersonalTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPersonalTag,
    onSuccess: () => {
      invalidateDependentQueries(queryClient);
    },
  });
};

export const useUpdatePersonalTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePersonalTag,
    onSuccess: ({ id }) => {
      invalidateDependentQueries(queryClient);
      queryClient.invalidateQueries({ queryKey: queryKey.show(id) });
    },
  });
};

export const useDeletePersonalTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePersonalTag,
    onSuccess: (_, id) => {
      invalidateDependentQueries(queryClient);
      queryClient.removeQueries({ queryKey: queryKey.show(id) });
    },
  });
};
