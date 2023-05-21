import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export interface AuthSchema {
  isAuth: boolean;
  isLoading: boolean;

  loginError: AxiosError<unknown, any> | null;
  registerError: AxiosError<unknown, any> | null;

  registerUser: (
    fullName: string,
    email: string,
    birthDate: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;

  loginUser: (email: string, password: string) => Promise<void>;

  logoutUser: (navigate: NavigateFunction) => Promise<void>;
}
