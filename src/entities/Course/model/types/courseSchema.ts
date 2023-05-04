import { AxiosError } from "axios";
import { courseState } from "./courseState";

export interface courseSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;
  course: courseState | null;
  success: boolean;

  getCourseById: (id: string) => Promise<void>;
}
