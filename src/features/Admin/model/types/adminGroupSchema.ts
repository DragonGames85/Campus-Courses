import { AxiosError } from "axios";

export interface adminGroupSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;
  addGroup: (name: string) => Promise<void>;
  deleteGroup: (name: string) => Promise<void>;
  updateGroup: (id: string, name: string) => Promise<void>;
}
