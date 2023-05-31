import { CourseList, useCourseListStore } from "@src/entities/Course";
import { useGroupStore } from "@src/entities/Group";
import { useProfileStore } from "@src/entities/Profile";
import { CreateCourseModal } from "@src/features/Admin";
import { useAuthStore } from "@src/features/AuthByEmail";
import { memo, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { BsGrid3X3 } from "react-icons/bs";
import { RxRows } from "react-icons/rx";
import cls from "./GroupDetailsPage.module.scss";

const GroupDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, getCoursesByGroup, isLoading, error, success } =
    useCourseListStore();

  const [createGroup, setCreateGroup] = useState(false);

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

  const { groups, getGroups, isLoading: GroupLoading } = useGroupStore();
  const groupName = groups.find(group => group.id === id)?.name;
  const groupId = groups.find(group => group.id === id)?.id;

  const { profile } = useProfileStore();
  const isAdmin = profile?.roles.isAdmin;

  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();
  if (error?.response?.status == 401) logoutUser(navigate);

  useEffect(() => {
    if (id) getCoursesByGroup(id);
    if (!groupName) getGroups();
  }, [id]);

  return (
    <Container className="p-3">
      <Row className="d-flex align-items-center">
        <Col>
          {groupName && !isLoading && !GroupLoading && (
            <h2 className="text-white mb-3">Группа - {groupName}</h2>
          )}
          {(isLoading || GroupLoading) && <h2>Загрузка...</h2>}
        </Col>
        <Col className="me-3">
          <RxRows
            onClick={() => {
              setMode("row");
              setView("row");
            }}
            className={`float-end ${cls.rows}`}
            style={{ color: mode === "row" ? "cyan" : "white" }}
          />
          <BsGrid3X3
            onClick={() => {
              setMode("grid");
              setView("grid");
            }}
            className={`float-end me-3 ${cls.grid}`}
            style={{ color: mode === "grid" ? "cyan" : "white" }}
          />
        </Col>
      </Row>
      <CreateCourseModal
        show={createGroup}
        setShow={setCreateGroup}
        reload={getCoursesByGroup}
        groupId={groupId}
      />
      {isAdmin && !error && !(isLoading || GroupLoading) && (
        <Button
          className="btn btn-primary mb-4 mt-3 d-flex align-items-center"
          onClick={() => setCreateGroup(true)}
        >
          <MdOutlineCreateNewFolder className="me-2" />
          Создать курс
        </Button>
      )}
      <CourseList
        mode={mode}
        success={success}
        courses={courses}
        error={error}
        isLoading={isLoading || GroupLoading}
      />
    </Container>
  );
};

export default memo(GroupDetailsPage);
