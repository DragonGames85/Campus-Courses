import { AxiosError } from "axios";
import { groupState } from "./groupState";

export interface groupSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;
  success: boolean;
  groups: groupState[];

  getGroups: () => Promise<void>;
}
