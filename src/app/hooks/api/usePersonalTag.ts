import { useQuery } from "@tanstack/react-query";

const endpoint = `${process.env.API_BASE_PATH}/personal/tag`;

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

const fetchPersonalTag = async (): Promise<Array<PersonalTagVO>> => {
  const response = await fetch(`${endpoint}`);
  const data = await response.json()
  return data;

};

const useGetPersonalTagList = () => {
  return useQuery({
    queryKey: queryKey.list(),
    queryFn: () => fetchPersonalTag(),
    select: (data) => {
      return data;
    },
  });
};

export { useGetPersonalTagList };
