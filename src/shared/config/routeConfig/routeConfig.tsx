import { CourseDetailsPage } from "@src/pages/CourseDetailsPage";
import { GroupDetailsPage } from "@src/pages/GroupDetailsPage";
import { GroupsPage } from "@src/pages/GroupsPage";
import { LoginPage } from "@src/pages/LoginPage";
import { MyCoursesPage } from "@src/pages/MyCoursesPage";
import { ProfilePage } from "@src/pages/ProfilePage";
import { RegisterPage } from "@src/pages/RegisterPage";
import { TeachingCoursesPage } from "@src/pages/TeachingCoursesPage";
import { Navigate, RouteProps } from "react-router-dom";
import MainPage from "@src/pages/MainPage";

export enum Access {
  ALL = "all",
  NO_AUTH = "no-auth",
  AUTH_ONLY = "authOnly",
}

export type AppRoutesProps = RouteProps & {
  access: Access;
};

export enum AppRoutes {
  MAIN = "main",
  MY_COURSES = "my_courses",
  TEACHING_COURSES = "teaching_courses",
  COURSES = "courses",
  GROUPS = "groups",
  GROUP_DETAILS = "group_details",
  LOGIN = "login",
  REGISTER = "register",
  NOT_FOUND = "not_found",
  PROFILE = "profile",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTER]: "/register",
  [AppRoutes.MY_COURSES]: "/courses/my",
  [AppRoutes.TEACHING_COURSES]: "/courses/teaching",
  [AppRoutes.COURSES]: "/courses/",
  [AppRoutes.GROUPS]: "/groups",
  [AppRoutes.GROUP_DETAILS]: "/groups/",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
    access: Access.ALL,
  },

  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
    access: Access.NO_AUTH,
  },

  [AppRoutes.REGISTER]: {
    path: RoutePath.register,
    element: <RegisterPage />,
    access: Access.NO_AUTH,
  },

  [AppRoutes.MY_COURSES]: {
    path: RoutePath.my_courses,
    element: <MyCoursesPage />,
    access: Access.AUTH_ONLY,
  },

  [AppRoutes.TEACHING_COURSES]: {
    path: RoutePath.teaching_courses,
    element: <TeachingCoursesPage />,
    access: Access.AUTH_ONLY,
  },

  [AppRoutes.COURSES]: {
    path: `${RoutePath.courses}:id`,
    element: <CourseDetailsPage />,
    access: Access.AUTH_ONLY,
  },

  [AppRoutes.GROUPS]: {
    path: RoutePath.groups,
    element: <GroupsPage />,
    access: Access.AUTH_ONLY,
  },

  [AppRoutes.GROUP_DETAILS]: {
    path: `${RoutePath.group_details}:id`,
    element: <GroupDetailsPage />,
    access: Access.AUTH_ONLY,
  },

  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    access: Access.AUTH_ONLY,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <Navigate to="/" replace />,
    access: Access.ALL,
  },
};
