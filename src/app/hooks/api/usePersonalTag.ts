import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from './request'
import { queryKey as essentialOilQueryKey } from './useEssentialOil'
const endpoint = `/personal/tag`;

export const queryKey = {
  all: ["personal-tag"] as const,
  lists: () => [...queryKey.all, "list"] as const,
  list: (query?: unknown) => [...queryKey.lists(), query ?? ""] as const,
  shows: () => [...queryKey.all, "show"] as const,
  show: (id: number) => [...queryKey.shows(), id] as const,
};

export interface PersonalTagVO {
  id: string | number;
  name: string;
  color: string;
}

export interface PersonalTagForm {
  name: string;
  color: string;
}

const fetchPersonalTag = async () => {
  const response = await request.get<Promise<Array<PersonalTagVO>>>(`${endpoint}`);
  return response;
};

const postPersonalTag = async (data: PersonalTagForm) => {
  const response = await request.post(endpoint, {
    data: data
  })
  return response
}

const useGetPersonalTagList = () => {
  return useQuery({
    queryKey: queryKey.list(),
    queryFn: () => fetchPersonalTag(),
    select: (data) => {
      return data;
    },
  });
};

const usePostPersonalTag = () => {
  return useMutation({
    mutationFn: postPersonalTag,
    onSuccess: () => {
      const queryClient = useQueryClient()
      queryClient.invalidateQueries({
        queryKey: essentialOilQueryKey.all
      })
    },
  });
};

export { useGetPersonalTagList, usePostPersonalTag };
