import { AxiosError } from "axios";

export interface requestSchema {
  isLoading: boolean;
  studentStatusError: AxiosError<unknown, any> | null;
  studentMarksError: AxiosError<unknown, any> | null;
  isStudentStatusUpdated: boolean;
  isStudentMarksUpdated: boolean;

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
