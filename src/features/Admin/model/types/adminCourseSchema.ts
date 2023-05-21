import { courseItem } from "@src/entities/Course";
import { AxiosError } from "axios";

interface newCourseProps extends courseItem {
  requirements: string;
  annotations: string;
  mainTeacherId: string;
}

export interface adminCourseSchema {
  isLoading: boolean;
  

  createError: AxiosError<unknown, any> | null;
  deleteError: AxiosError<unknown, any> | null;

  isCreated: boolean;
  isDeleted: boolean;

  addCourse: (
    course: Omit<newCourseProps, "id" | "status" | "remainingSlotsCount">,
    id: string
  ) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}
