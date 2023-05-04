import { courseItem, courseState } from "@src/entities/Course";
import { profileState } from "@src/entities/Profile";

interface getCoursesRolesProps {
  profile: profileState | null;
  course: courseState | null;
  myCourses: courseItem[] | null;
}

export function getCourseRoles({
  profile,
  course,
  myCourses,
}: getCoursesRolesProps) {
  const isAcceptedStudent = course?.students.some(
    student => student.email === profile?.email && student.status === "Accepted"
  );

  const isDeclinedStudent = course?.students.some(
    student => student.email === profile?.email && student.status === "Declined"
  );

  const isTeacher = course?.teachers.some(
    teacher => teacher.email === profile?.email
  );

  const isMainTeacher = course?.teachers.some(
    teacher => teacher.email === profile?.email && teacher.isMain
  );

  const isQueueStudent = myCourses?.some(
    courseItem => courseItem.id === course?.id
  );

  return {
    isAcceptedStudent,
    isDeclinedStudent,
    isTeacher,
    isMainTeacher,
    isQueueStudent,
  };
}
