import { courseItem } from "@src/entities/Course";
import { AxiosError } from "axios";

interface newCourseProps extends courseItem {
  requirements: string;
  annotations: string;
  mainTeacherId: string;
}

export interface adminCourseSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;

  addCourse: (
    course: Omit<newCourseProps, "id" | "status" | "remainingSlotsCount">,
    id: string
  ) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}
