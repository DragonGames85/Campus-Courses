import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export interface AuthSchema {
  isAuth: boolean;
  error: AxiosError<unknown, any> | null;
  isLoading: boolean;

  registerUser: (
    fullName: string,
    email: string,
    birthDate: string,
    password: string,
    confirmPassword: string,
    navigate: NavigateFunction,
    showErrors: (value: boolean) => void
  ) => Promise<void>;

  loginUser: (
    email: string,
    password: string,
    navigate: NavigateFunction,
    showErrors: (value: boolean) => void
  ) => Promise<void>;

  logoutUser: (navigate: NavigateFunction) => Promise<void>;
}
