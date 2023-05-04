import { notificationState } from "@src/entities/Notification";
import { AxiosError } from "axios";

export interface editCourseSchema {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;

  addTeacher: (id: string, userId: string) => Promise<void>;
  createNotification: (
    id: string,
    notification: notificationState
  ) => Promise<void>;

  setCourseStatus: (id: string, status: string) => Promise<void>;

  editCourseInfo: (
    id: string,
    requirements: string,
    annotations: string
  ) => Promise<void>;
}
