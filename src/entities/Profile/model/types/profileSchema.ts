import { AxiosError } from "axios";
import { profileState } from "./profileState";

export interface profileSchema {
  error: AxiosError<unknown, any> | null;
  
  isLoading: boolean;
  profile: profileState | null;
  success: boolean;

  getProfile: () => Promise<void>;
  putProfile: (fullName: string, birthDate: string) => Promise<void>;
}
