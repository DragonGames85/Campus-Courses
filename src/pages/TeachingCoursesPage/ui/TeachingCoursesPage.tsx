import { CourseList, useCourseListStore } from "@src/entities/Course";
import { useAuthStore } from "@src/features/AuthByEmail";
import { memo, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cls from "./TeachingCoursesPage.module.scss";
import { BsGrid3X3 } from "react-icons/bs";
import { RxRows } from "react-icons/rx";

const TeachingCoursesPage = () => {
  const { teachingCourses, getTeachingCourses, isLoading, error, success } =
    useCourseListStore();

  const setView = (view: "grid" | "row") => {
    localStorage.setItem("view", view);
  };

  const getView = () => {
    const view = localStorage.getItem("view");
    if (view && (view === "grid" || view === "row"))
      return view as "grid" | "row";
    else return "row";
  };

  const [mode, setMode] = useState<"grid" | "row">(getView());

  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();
  if (error?.response?.status == 401) logoutUser(navigate);

  useEffect(() => {
    getTeachingCourses();
  }, []);
  return (
    <Container>
      <Row className="d-flex align-items-center">
        <Col>
          <h2>Преподаваемые курсы</h2>
        </Col>
        <Col className="me-3">
          <RxRows
            onClick={() => {
              setMode("row");
              setView("row");
            }}
            className={`float-end ${cls.rows}`}
            style={{ color: mode === "row" ? "blue" : "grey" }}
          />
          <BsGrid3X3
            onClick={() => {
              setMode("grid");
              setView("grid");
            }}
            className={`float-end me-3 ${cls.grid}`}
            style={{ color: mode === "grid" ? "blue" : "grey" }}
          />
        </Col>
      </Row>
      <CourseList
        mode={mode}
        success={success}
        courses={teachingCourses}
        error={error}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default memo(TeachingCoursesPage);
