import { AxiosError } from "axios";

export interface teacherListSchema {
  isLoading: boolean;
  error: AxiosError | null;
  isSuccess: boolean;
  addTeacher: (id: string, userId: string) => Promise<void>;
}
