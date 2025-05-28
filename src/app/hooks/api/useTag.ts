import { useQuery } from "@tanstack/react-query";

const endpoint = `${process.env.API_BASE_PATH}/tag`;

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

const fetchTag = async (): Promise<Array<TagVO>> => {
  const response = await fetch(`${endpoint}`);
  const data = await response.json()
  return data;

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
