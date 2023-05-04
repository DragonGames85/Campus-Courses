import { useSignStore } from "@src/features/CourseSignUp";
import { Skeleton } from "@src/shared/ui/Skeleton/Skeleton";
import { Button, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { IoCreateOutline } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { courseState } from "../../model/types/courseState";

interface CourseDetailsProps {
  canEdit: boolean | undefined;
  isTeacher: boolean | undefined;
  isAcceptedStudent: boolean | undefined;
  isDeclinedStudent: boolean | undefined;
  isQueueStudent: boolean | undefined; 
  havePlaces: boolean;
  Course: courseState;
  isLoading: boolean;
  reload: (id: string) => void;
  updateMyCourses: () => void;
  showModal: (value: boolean) => void;
}

export const CourseDetails = (props: CourseDetailsProps) => {
  const {
    canEdit,
    isTeacher,
    isAcceptedStudent,
    isDeclinedStudent,
    isQueueStudent,
    havePlaces,
    Course,
    isLoading,
    reload,
    updateMyCourses,
    showModal,
  } = props;

  const { signUp, isLoading: requestLoading } = useSignStore();

  const onChangeClick = () => {
    showModal(true);
  };

  if (isLoading)
    return (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Skeleton />
          </ListGroup.Item>
          <ListGroup.Item>
            <Skeleton />
          </ListGroup.Item>
          <ListGroup.Item>
            <Skeleton />
          </ListGroup.Item>
          <ListGroup.Item>
            <Skeleton />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  else
    return (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row className="align-items-center justify-content-between">
              <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                <strong>Статус курса</strong>
                {Course.status === "Finished" && (
                  <Card.Text className="text-danger">Закрыт</Card.Text>
                )}
                {Course.status === "Started" && (
                  <Card.Text className="text-primary">В процессе</Card.Text>
                )}
                {Course.status === "Created" && (
                  <Card.Text className="text-muted">Создан</Card.Text>
                )}
                {Course.status === "OpenForAssigning" && (
                  <Card.Text className="text-success">
                    Открыт для записи
                  </Card.Text>
                )}
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
                {canEdit && Course.status !== "Finished" && (
                  <Button
                    variant="warning"
                    className="float-end ms-3 mt-1"
                    onClick={onChangeClick}
                  >
                    <div className="d-flex align-items-center">
                      <IoCreateOutline className="me-2" />
                      Изменить статус
                    </div>
                  </Button>
                )}
                {isAcceptedStudent && (
                  <Card.Text className="text-primary float-end mt-2">
                    Вы приняты на курс
                  </Card.Text>
                )}
                {!isTeacher &&
                  !isAcceptedStudent &&
                  !isDeclinedStudent &&
                  !isQueueStudent &&
                  havePlaces &&
                  Course.status === "OpenForAssigning" && (
                    <Button
                      variant="success"
                      className="float-end mt-1"
                      onClick={() =>
                        signUp(Course.id)
                          .then(() => {
                            reload(Course.id);
                          })
                          .then(() => {
                            updateMyCourses();
                          })
                      }
                    >
                      {requestLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Записываемся...
                        </>
                      ) : (
                        <>
                          <MdAssignmentAdd className="me-2" />
                          Записаться на курс
                        </>
                      )}
                    </Button>
                  )}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <strong>Учебный год</strong>
                <Card.Text className="text-muted">
                  {Course.startYear} - {Course.startYear + 1}
                </Card.Text>
              </Col>
              <Col>
                <strong>Семестр</strong>
                <Card.Text className="mb-2 text-muted">
                  {Course.semester == "Autumn" ? "Осенний" : "Весенний"}
                </Card.Text>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <strong>Всего мест</strong>
                <Card.Text className="text-muted">
                  {Course.maximumStudentsCount}
                </Card.Text>
              </Col>
              <Col>
                <strong>Студентов зачислено</strong>
                <Card.Text className="text-muted">
                  {Course.studentsEnrolledCount}
                </Card.Text>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Заявок на рассмотрении</strong>
            <Card.Text className="text-muted">
              {Course.studentsInQueueCount}
            </Card.Text>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
};
