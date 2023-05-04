import { AxiosError } from "axios";
import { userState } from "./userState";

export interface userListSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;
  users: userState[];

  getUsers: () => Promise<void>;
}
