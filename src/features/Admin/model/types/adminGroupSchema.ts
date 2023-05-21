import { AxiosError } from "axios";

export interface adminGroupSchema {
  isLoading: boolean;

  createError: AxiosError<unknown, any> | null;
  deleteError: AxiosError<unknown, any> | null;
  updateError: AxiosError<unknown, any> | null;

  isCreated: boolean;
  isDeleted: boolean;
  isUpdated: boolean;

  addGroup: (name: string) => Promise<void>;
  deleteGroup: (name: string) => Promise<void>;
  updateGroup: (id: string, name: string) => Promise<void>;
}
