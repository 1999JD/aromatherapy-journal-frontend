import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "./request";
import { ApiPagedResponse, ApiTagDto, Tag } from "./types";

export type { Tag } from "./types";

const endpoint = "/tag";

export const queryKey = {
  all: ["tag"] as const,
  lists: () => [...queryKey.all, "list"] as const,
  list: (query?: unknown) => [...queryKey.lists(), query ?? ""] as const,
  shows: () => [...queryKey.all, "show"] as const,
  show: (id: number | string) => [...queryKey.shows(), id] as const,
};

export type TagInput = {
  name: string;
  color: string;
};

export type TagListParams = {
  pageNumber?: number;
  pageSize?: number;
};

export type TagListResponse = ApiPagedResponse<Tag>;

const fetchTags = async (params: TagListParams = {}): Promise<TagListResponse> => {
  const { pageNumber = 1, pageSize = 10 } = params;
  const response = await request.get<any, ApiPagedResponse<ApiTagDto>>(`${endpoint}`, {
    params: { pageNumber, pageSize },
  });

  return {
    ...response,
    items:
      response.items?.map((tag) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      })) ?? [],
    pageNumber: response.pageNumber,
    pageSize: response.pageSize,
    totalCount: response.totalCount,
    totalPages: response.totalPages,
  };
};

const createTag = async (payload: TagInput): Promise<Tag> => {
  const response = await request.post<any, ApiTagDto>(`${endpoint}`, payload);
  return response;
};

const updateTag = async ({
  id,
  payload,
}: {
  id: number | string;
  payload: Partial<TagInput>;
}): Promise<Tag> => {
  const response = await request.put<any, ApiTagDto>(
    `${endpoint}/${id}`,
    payload
  );
  return response;
};

const deleteTag = async (id: number | string) => {
  await request.delete(`${endpoint}/${id}`);
};

export const useGetTagList = (params?: TagListParams) => {
  const queryParams = params ?? {};
  return useQuery({
    queryKey: queryKey.list(queryParams),
    queryFn: () => fetchTags(queryParams),
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.lists() });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTag,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: queryKey.lists() });
      queryClient.invalidateQueries({ queryKey: queryKey.show(id) });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKey.lists() });
      queryClient.removeQueries({ queryKey: queryKey.show(id) });
    },
  });
};
