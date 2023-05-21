import { notificationState } from "@src/entities/Notification";
import { AxiosError } from "axios";

export interface editCourseSchema {
  isLoading: boolean;
  
  infoError: AxiosError<unknown, any> | null;
  statusError: AxiosError<unknown, any> | null;
  notificationError: AxiosError<unknown, any> | null;

  isInfoUpdated: boolean;
  isStatusUpdated: boolean;
  isNotificationCreated: boolean;


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
