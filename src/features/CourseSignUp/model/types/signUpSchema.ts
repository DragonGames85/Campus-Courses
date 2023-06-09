import { AxiosError } from "axios";

export interface signUpSchema {
  isLoading: boolean;
  error: AxiosError | null;
  isSuccess: boolean;
  signUp: (id: string) => Promise<void>;
}
