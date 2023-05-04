import { AxiosError } from "axios";

export interface requestSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;

  setStudentStatus: (
    courseId: string,
    studentId: string,
    status: string
  ) => Promise<void>;

  setStudentMarks: (
    courseId: string,
    studentId: string,
    markType: string,
    mark: string
  ) => Promise<void>;
}
