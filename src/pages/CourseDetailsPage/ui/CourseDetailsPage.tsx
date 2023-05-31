import {
  CourseDetails,
  CourseInfo,
  useCourseListStore,
  useCourseStore,
} from "@src/entities/Course";
import { useProfileStore } from "@src/entities/Profile";
import { DeleteCourseModal } from "@src/features/Admin";
import { useAuthStore } from "@src/features/AuthByEmail";
import {
  CourseAddNotificationModal,
  CourseInfoEditModal,
  CourseStatusEditModal,
} from "@src/features/CourseEdit";
import {
  CourseMarksModal,
  StudentRequests,
} from "@src/features/StudentRequests";
import { TeacherList, TeacherListModal } from "@src/features/TeacherList";
import { getCourseRoles } from "@src/shared/lib/helpers/getCourseRoles";
import { ErrorCard } from "@src/shared/ui/ErrorCard/ErrorCard";
import { Skeleton } from "@src/shared/ui/Skeleton/Skeleton";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { course, getCourseById, isLoading, error } = useCourseStore();
  const {
    getMyCourses,
    getTeachingCourses,
    myCourses,
    isLoading: MCloading,
  } = useCourseListStore();

  const { getProfile } = useProfileStore();

  const [editInfo, setEditInfo] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(false);
  const [addNotification, setAddNotification] = useState(false);
  const [addTeacher, setAddTeacher] = useState(false);
  const [mark, setMark] = useState(false);

  const [chosenStudent, chooseStudent] = useState("");
  const [chosenMark, chooseMark] = useState(false);

  const [userType, setUserType] = useState("student");

  const { logoutUser } = useAuthStore();
  const { profile } = useProfileStore();

  const isAdmin = profile?.roles.isAdmin;

  const havePlaces = course
    ? course?.maximumStudentsCount - course?.studentsEnrolledCount > 0
    : false;

  useEffect(() => {
    if (id) {
      getCourseById(id);
      getMyCourses();
    }
  }, [id]);

  const navigate = useNavigate();
  if (error?.response?.status == 401) {
    logoutUser(navigate);
    return <></>;
  } else if (error?.response?.status == 404)
    return <ErrorCard text="Курс не найден" />;
  else if (course || isLoading || MCloading) {
    const {
      isAcceptedStudent,
      isDeclinedStudent,
      isTeacher,
      isMainTeacher,
      isQueueStudent,
    } = getCourseRoles({ course, profile, myCourses });

    return (
      <Container className="text-white p-3">
        {course?.name && !isLoading ? (
          <Row className="text-center">
            <h1>{course?.name}</h1>
          </Row>
        ) : (
          <h1 className="mb-3">Загрузка...</h1>
        )}
        {!isLoading && (
          <Row className="align-items-end mb-3 mt-3 text-center">
            <Col xxl={3} xl={3} lg={4} md={5} sm={12} xs={12}>
              <h5>Основные данные курса</h5>
            </Col>
            <Col
              xxl={9}
              xl={9}
              lg={8}
              md={7}
              sm={10}
              xs={11}
              className="d-flex justify-content-end align-items-center"
            >
              {(isAdmin || isTeacher) && !error && (
                <Button
                  variant="warning"
                  className="d-flex align-items-center me-3"
                  onClick={() => setEditInfo(true)}
                >
                  <IoCreateOutline className="me-2" />
                  Редактировать
                </Button>
              )}
              {isAdmin && !error && (
                <Button variant="danger" onClick={() => setDeleteCourse(true)}>
                  <BsTrash className="me-2" />
                  Удалить курс
                </Button>
              )}
            </Col>
          </Row>
        )}

        <CourseInfoEditModal
          show={editInfo}
          setShow={setEditInfo}
          courseId={course?.id}
          courseAnnotations={course?.annotations}
          courseRequirements={course?.requirements}
          reload={getCourseById}
        />

        <CourseStatusEditModal
          courseId={course?.id}
          status={course?.status}
          show={editStatus}
          setShow={setEditStatus}
          reload={getCourseById}
        />

        <DeleteCourseModal
          show={deleteCourse}
          setShow={setDeleteCourse}
          courseID={course?.id}
          courseName={course?.name}
        />

        <CourseAddNotificationModal
          courseId={course?.id}
          show={addNotification}
          setShow={setAddNotification}
          reload={getCourseById}
        />

        <TeacherListModal
          show={addTeacher}
          setShow={setAddTeacher}
          courseId={course?.id}
          reload={getCourseById}
          updateTeachingCourses={getTeachingCourses}
          updateNavbar={getProfile}
        />

        <CourseMarksModal
          courseId={course?.id}
          show={mark}
          setShow={setMark}
          studentId={chosenStudent}
          isFinal={chosenMark}
          reload={getCourseById}
        />

        <CourseDetails
          isTeacher={isTeacher}
          isAcceptedStudent={isAcceptedStudent}
          isDeclinedStudent={isDeclinedStudent}
          isQueueStudent={isQueueStudent}
          havePlaces={havePlaces}
          canEdit={isAdmin || isTeacher}
          isLoading={isLoading}
          Course={course!}
          reload={getCourseById}
          updateMyCourses={getMyCourses}
          updateNavbar={getProfile}
          showModal={setEditStatus}
        />

        <CourseInfo
          canEdit={isAdmin || isTeacher}
          isLoading={isLoading}
          Course={course!}
          showModal={setAddNotification}
        />

        <div className="mb-5">
          {isLoading ? (
            <Card className="mt-4">
              <Card.Body>
                <Skeleton height={"128px"} />
              </Card.Body>
            </Card>
          ) : (
            <Tabs
              fill
              activeKey={userType}
              onSelect={k => setUserType(k as string)}
              className="mt-4"
            >
              <Tab eventKey="teacher" title="Преподаватели">
                <TeacherList
                  showModal={setAddTeacher}
                  canAdd={isAdmin || isMainTeacher}
                  teachers={course!.teachers}
                />
              </Tab>
              <Tab eventKey="student" title="Студенты">
                <StudentRequests
                  showModal={setMark}
                  chooseStudent={chooseStudent}
                  chooseMark={chooseMark}
                  courseId={course?.id}
                  canAdd={isAdmin || isMainTeacher}
                  canMark={isAdmin || isTeacher || isMainTeacher}
                  students={course!.students}
                  reload={getCourseById}
                  updateMyCourses={getMyCourses}
                  updateNavbar={getProfile}
                />
              </Tab>
            </Tabs>
          )}
        </div>
      </Container>
    );
  } else return <ErrorCard text="Произошла ошибка ошибка при загрузке курса" />;
};

export default CourseDetailsPage;
