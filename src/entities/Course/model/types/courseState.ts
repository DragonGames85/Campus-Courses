import { notificationState } from "@src/entities/Notification";
import { studentState } from "@src/features/StudentRequests";
import { teacherState } from "@src/features/TeacherList";

export interface courseState {
  id: string;
  name: string;

  requirements: string;
  annotations: string;

  semester: string;
  status: string;

  startYear: number;

  maximumStudentsCount: number;
  studentsEnrolledCount: number;
  studentsInQueueCount: number;

  students: studentState[];
  teachers: teacherState[];

  notifications: notificationState[];
}
