import { useMutation } from "@tanstack/react-query";
import request from "./request";
import { ApiNewUserDto } from "./types";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const endpoint = "/account";

export interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export interface SignInForm {
  username: string;
  password: string;
}

export interface AuthUser {
  username: string;
  email: string;
  token: string;
}

const signUp = async (data: SignUpForm): Promise<AuthUser> => {
  const response = await request.post<any, ApiNewUserDto>(
    `${endpoint}/register`,
    data
  );
  return response;
};

const signIn = async (data: SignInForm): Promise<AuthUser> => {
  const response = await request.post<any, ApiNewUserDto>(
    `${endpoint}/login`,
    data
  );
  return response;
};

export const useSignUp = (router: ReturnType<typeof useRouter>) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push("/sign-in");
    },
  });
};

export const useSignIn = (router: ReturnType<typeof useRouter>) => {
  const authContext = useAuth();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      authContext.login(data.token);
      router.push("/essential-oil");
    },
  });
};
