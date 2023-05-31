import { useAuthStore } from "@src/features/AuthByEmail";
import {
  Access,
  AppRoutesProps,
  routeConfig,
} from "@src/shared/config/routeConfig/routeConfig";
import { PageLoader } from "@src/shared/ui/PageLoader/PageLoader";
import { Suspense, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  const { isAuth } = useAuthStore();

  const renderWithWrapper = useCallback(
    (route: AppRoutesProps) => {
      const element = (
        <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
      );

      const renderedElement =
        route.access === Access.ALL ||
        (route.access === Access.NO_AUTH && !isAuth) ||
        (route.access === Access.AUTH_ONLY && isAuth) ? (
          element
        ) : (
          <Navigate to="/" replace />
        );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={renderedElement}
        />
      );
    },
    [isAuth]
  );

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
