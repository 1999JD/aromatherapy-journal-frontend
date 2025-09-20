import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from './request'
import { queryKey as essentialOilQueryKey } from './useEssentialOil'
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from 'next/navigation';
const endpoint = `/account`;

// export const queryKey = {
//   all: ["personal-tag"] as const,
//   lists: () => [...queryKey.all, "list"] as const,
//   list: (query?: unknown) => [...queryKey.lists(), query ?? ""] as const,
//   shows: () => [...queryKey.all, "show"] as const,
//   show: (id: number) => [...queryKey.shows(), id] as const,
// };

// export interface PersonalTagVO {
//   id: string | number;
//   name: string;
//   color: string;
// }

export interface SignUpForm {
    username: string;
    email: string;
    password: string;
}

export interface SignInForm {
    username: string;
    password: string;
}

export interface SignUpVO {
    email: string;
    username: string;
    token: string
}

export interface SignInVO {
    email: string;
    username: string;
    token: string
}

// const fetchPersonalTag = async () => {
//   const response = await request.get<Promise<Array<PersonalTagVO>>>(`${endpoint}`);
//   return response;
// };

const signUp = async (data: SignUpForm) => {
    const response = await request.post<any, Promise<SignUpVO>>(`${endpoint}/register`, data)
    return response
}

const signIn = async (data: SignInForm) => {
    const response = await request.post<any, Promise<SignInVO>>(`${endpoint}/login`, data)
    return response
}

// const useGetPersonalTagList = () => {
//     return useQuery({
//         queryKey: queryKey.list(),
//         queryFn: () => fetchPersonalTag(),
//         select: (data) => {
//             return data;
//         },
//     });
// };

// 把 router 當作參數傳入
const useSignUp = (router: ReturnType<typeof useRouter>) => {
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            router.push('/sign-in');
        },
        onError: (err) => {
            console.error(err);
        },
    });
};

const useSignIn = (router: ReturnType<typeof useRouter>) => {
    const authContext = useAuth()

    return useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            authContext.login(data.token)
            router.push('/essential-oil');
        },
        onError: (err) => {
            console.error(err)
        }
    });
};



export { useSignIn, useSignUp };
