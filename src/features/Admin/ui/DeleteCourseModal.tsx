import { Button, Modal, Spinner } from "react-bootstrap";
import { useAdminCourseStore } from "../model/store/adminCourse";

interface CourseDeleteModalProps {
  show: boolean;
  courseID: string | undefined;
  courseName: string | undefined;
  setShow: (value: boolean) => void;
}

export const DeleteCourseModal = (props: CourseDeleteModalProps) => {
  const { courseName, courseID, show, setShow } = props;

  const { isLoading, deleteCourse } = useAdminCourseStore();

  const onClose = () => setShow(false);

  const onDelete = () => {
    deleteCourse(courseID!);
  };

  return (
    <Modal className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Удалить курс "${courseName}" ?`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="danger" onClick={onDelete}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Удаляем...
            </>
          ) : (
            "Удалить"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
