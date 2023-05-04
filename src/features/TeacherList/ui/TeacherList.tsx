import { Badge, Button, ListGroup } from "react-bootstrap";
import { teacherState } from "../model/types/teacherState";
import { IoPersonAddOutline } from "react-icons/io5";

interface TeacherListProps {
  canAdd: boolean | undefined;
  showModal: (value: boolean) => void;
  teachers: teacherState[];
}

export const TeacherList = ({
  canAdd,
  teachers,
  showModal,
}: TeacherListProps) => {
  return (
    <ListGroup
      className="border-start border-end border-bottom"
      variant="flush"
    >
      {canAdd && (
        <ListGroup.Item>
          <Button onClick={() => showModal(true)}>
            <IoPersonAddOutline className="me-2" />
            ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ
          </Button>
        </ListGroup.Item>
      )}
      {teachers.map(teacher => (
        <ListGroup.Item key={teacher.email}>
          <strong>{teacher.name}</strong>
          {teacher.isMain && (
            <Badge className="ms-2" bg="success">
              Основной
            </Badge>
          )}
          <br />
          {teacher.email}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
