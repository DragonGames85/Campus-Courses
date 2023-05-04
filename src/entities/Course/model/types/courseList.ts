import { AxiosError } from "axios";
import { courseItem } from "./courseItem";

export interface courseListSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;
  success: boolean;
  courses: courseItem[];
  myCourses: courseItem[];
  teachingCourses: courseItem[];

  getCoursesByGroup: (id: string) => Promise<void>;
  getMyCourses: () => Promise<void>;
  getTeachingCourses: () => Promise<void>;
}
