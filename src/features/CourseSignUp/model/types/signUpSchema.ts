import { AxiosError } from "axios";

export interface signUpSchema {
  isLoading: boolean;
  error: AxiosError | null;
  signUp: (id: string) => Promise<void>;
}
