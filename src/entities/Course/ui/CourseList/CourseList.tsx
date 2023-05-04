import { ErrorCard } from "@src/shared/ui/ErrorCard/ErrorCard";
import { Skeleton } from "@src/shared/ui/Skeleton/Skeleton";
import { AxiosError } from "axios";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { courseItem } from "../../model/types/courseItem";
import cls from "./CourseList.module.scss";

interface courseListProps {
  isLoading: boolean;
  error: AxiosError<unknown, any> | null;
  success: boolean;
  courses: courseItem[];
  mode: "row" | "grid";
}

export const CourseList = (props: courseListProps) => {
  const navigate = useNavigate();

  const { courses, error, success, isLoading, mode } = props;

  if (error) {
    if (error?.response?.status == 404)
      return <ErrorCard text="Группа не найдена" />;
    else
      return <ErrorCard text="Произошла ошибка ошибка при загрузке группы" />;
  } else if (isLoading) {
    return (
      <>
        {mode === "row" ? (
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Skeleton width="100%" height="164px" />
              </ListGroup.Item>
              <ListGroup.Item>
                <Skeleton width="100%" height="164px" />
              </ListGroup.Item>
              <ListGroup.Item>
                <Skeleton width="100%" height="164px" />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ) : (
          <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={4} className="mb-5 g-4">
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "300px" }}>
                <Skeleton width="100%" height="300px" />
              </Card>
            </Col>
          </Row>
        )}
      </>
    );
  } else if (!courses.length && success) {
    return <ErrorCard text="Список курсов пуст" />;
  }
  return (
    <>
      {mode === "row" ? (
        <Card className="mb-5">
          <ListGroup variant="flush">
            {courses.map(course => (
              <ListGroup.Item
                key={course.id}
                className={cls.course}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <Row>
                  <Col>
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text className="mb-2">
                      Учебный год -{" "}
                      {course.startYear + "-" + Number(course.startYear + 1)}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      Семестр -{" "}
                      {course.semester == "Autumn" ? "Осенний" : "Весенний"}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      Мест всего - {course.maximumStudentsCount}
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      Мест свободно - {course.remainingSlotsCount}
                    </Card.Text>
                  </Col>
                  <Col className="text-end">
                    {course.status === "OpenForAssigning" && (
                      <strong className="mb-2 text-success">
                        Открыт для записи
                      </strong>
                    )}
                    {course.status === "Finished" && (
                      <strong className="mb-2 text-danger">Закрыт</strong>
                    )}
                    {course.status === "Started" && (
                      <strong className="mb-2 text-primary">В процессе</strong>
                    )}
                    {course.status === "Created" && (
                      <strong className="mb-2 text-muted">Создан</strong>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={4} className="mb-5 g-4">
          {courses.map(course => (
            <Col key={course.id}>
              <Card
                style={{
                  borderColor:
                    course.status === "OpenForAssigning"
                      ? "green"
                      : course.status === "Finished"
                      ? "red"
                      : course.status === "Started"
                      ? "blue"
                      : "gray",
                }}
                className={cls.courseCard}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <Card.Header>
                  <Card.Title className={cls.gridBodyName}>
                    <p>{course.name}</p>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="mb-2">
                    Учебный год -{" "}
                    {course.startYear + "-" + Number(course.startYear + 1)}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    Семестр -{" "}
                    {course.semester == "Autumn" ? "Осенний" : "Весенний"}
                  </Card.Text>
                  <Card.Text className="mb-2 text-muted">
                    Мест всего - {course.maximumStudentsCount}
                  </Card.Text>
                  <Card.Text className="mb-4 text-muted">
                    Мест свободно - {course.remainingSlotsCount}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className={cls.status}>
                    {course.status === "OpenForAssigning" && (
                      <strong className="mb-2 text-success">
                        Открыт для записи
                      </strong>
                    )}
                    {course.status === "Finished" && (
                      <strong className="mb-2 text-danger">Закрыт</strong>
                    )}
                    {course.status === "Started" && (
                      <strong className="mb-2 text-primary">В процессе</strong>
                    )}
                    {course.status === "Created" && (
                      <strong className="mb-2 text-muted">Создан</strong>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
