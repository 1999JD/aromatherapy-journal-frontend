import { useQuery } from "@tanstack/react-query";
import request from './request'

const endpoint = `tag`;

export const queryKey = {
  all: ["tag"] as const,
  lists: () => [...queryKey.all, "list"] as const,
  list: (query?: unknown) => [...queryKey.lists(), query ?? ""] as const,
  shows: () => [...queryKey.all, "show"] as const,
  show: (id: number) => [...queryKey.shows(), id] as const,
};

export interface TagVO {
  id: string | number;
  name: string;
  color: string;
}

const fetchTag = async () => {
  const response = await request.get<any, Promise<Array<TagVO>>>(`${endpoint}`);
  return response;

};

const useGetTagList = () => {
  return useQuery({
    queryKey: queryKey.list(),
    queryFn: () => fetchTag(),
    select: (data) => {
      return data;
    },
  });
};

export { useGetTagList };
