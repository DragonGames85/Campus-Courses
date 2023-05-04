import { Badge, Button, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { studentState } from "../model/types/studentState";
import { useProfileStore } from "@src/entities/Profile";
import { useRequestStore } from "../model/store/requestStore";
import { useState } from "react";

interface StudentRequestsProps {
  canAdd: boolean | undefined;
  canMark: boolean | undefined;
  students: studentState[];
  showModal: (value: boolean) => void;
  chooseStudent: (value: string) => void;
  chooseMark: (value: boolean) => void;
  reload: (id: string) => void;
  updateMyCourses: () => void;
  courseId: string | undefined;
}

export const StudentRequests = ({
  canAdd,
  canMark,
  students,
  courseId,
  showModal,
  chooseStudent,
  chooseMark,
  updateMyCourses,
  reload,
}: StudentRequestsProps) => {
  const { profile } = useProfileStore();
  const { setStudentStatus, isLoading } = useRequestStore();
  const [pressed, setPressed] = useState("");

  return (
    <ListGroup
      className="border-start border-end border-bottom"
      variant="flush"
    >
      {!students.length && (
        <ListGroup.Item className="text-center">
          <h4>Студенты отсутствуют</h4>
        </ListGroup.Item>
      )}
      {isLoading && pressed == "accept" && (
        <div className="text-center text-primary">
          <Spinner className="me-2" animation="border" size="sm" />
          Принимаем...
        </div>
      )}

      {isLoading && pressed == "decline" && (
        <div className="text-center text-danger">
          <Spinner className="me-2" animation="border" size="sm" />
          Отклоняем...
        </div>
      )}
      {students.map(student => (
        <ListGroup.Item key={student.email}>
          {(canAdd || canMark) && (
            <Row>
              <Col>
                <strong>{student.name}</strong>
                <br />
                Статус -{" "}
                <span
                  className={
                    student.status === "InQueue"
                      ? "text-secondary"
                      : student.status === "Accepted"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {student.status == "InQueue"
                    ? "В очереди"
                    : student.status == "Accepted"
                    ? "Принят в группу"
                    : "Отклонен"}
                </span>
                <br />
                {student.email}
              </Col>
              {student.status == "InQueue" && canAdd && (
                <Col className="align-items-center justify-content-end d-flex">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      setStudentStatus(courseId!, student.id, "Accepted")
                        .then(() => {
                          reload(courseId!);
                        })
                        .then(() => {
                          updateMyCourses();
                        });
                      setPressed("accept");
                    }}
                  >
                    Принять
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setStudentStatus(courseId!, student.id, "Declined")
                        .then(() => {
                          reload(courseId!);
                        })
                        .then(() => {
                          updateMyCourses();
                        });
                      setPressed("decline");
                    }}
                  >
                    Отклонить заявку
                  </Button>
                </Col>
              )}
              {student.status == "Accepted" && (
                <Col>
                  <Row>
                    <Col>
                      <p>
                        Промежуточ. аттестация -{" "}
                        <Badge
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            chooseStudent(student.id);
                            chooseMark(false);
                            showModal(true);
                          }}
                          bg={
                            student.midtermResult === "NotDefined" ||
                            student.midtermResult === null
                              ? "secondary"
                              : student.midtermResult === "Passed"
                              ? "success"
                              : "danger"
                          }
                        >
                          {student.midtermResult == "NotDefined"
                            ? "Отметки нет"
                            : student.midtermResult == "Passed"
                            ? "Сдано"
                            : "Не сдано"}
                        </Badge>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Финальная аттестация -{" "}
                        <Badge
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            chooseStudent(student.id);
                            chooseMark(true);
                            showModal(true);
                          }}
                          bg={
                            student.finalResult === "NotDefined" ||
                            student.finalResult === null
                              ? "secondary"
                              : student.finalResult === "Passed"
                              ? "success"
                              : "danger"
                          }
                        >
                          {student.finalResult == "NotDefined"
                            ? "Отметки нет"
                            : student.finalResult == "Passed"
                            ? "Сдано"
                            : "Не сдано"}
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          )}
          {!canAdd && student.status == "Accepted" && (
            <Row>
              <Col>
                <strong>{student.name}</strong>
                <br />
                Статус - {student.status}
                <br />
                {student.email}
              </Col>
              {student.email == profile?.email && (
                <>
                  <Col>
                    <p>
                      Промежуточ. аттестация -{" "}
                      <Badge
                        bg={
                          student.midtermResult === "NotDefined" ||
                          student.midtermResult === null
                            ? "secondary"
                            : student.midtermResult === "Passed"
                            ? "success"
                            : "danger"
                        }
                      >
                        {student.midtermResult == "NotDefined"
                          ? "Отметки нет"
                          : student.midtermResult == "Passed"
                          ? "Сдано"
                          : "Не сдано"}
                      </Badge>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      Финальная аттестация -{" "}
                      <Badge
                        bg={
                          student.finalResult === "NotDefined" ||
                          student.finalResult === null
                            ? "secondary"
                            : student.finalResult === "Passed"
                            ? "success"
                            : "danger"
                        }
                      >
                        {student.finalResult == "NotDefined"
                          ? "Отметки нет"
                          : student.finalResult == "Passed"
                          ? "Сдано"
                          : "Не сдано"}
                      </Badge>
                    </p>
                  </Col>
                </>
              )}
            </Row>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
