import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useEditCourseStore } from "../model/store/editCourse";

interface NotificationModalProps {
  courseId: string | undefined;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
}

export const CourseAddNotificationModal = (props: NotificationModalProps) => {
  const { courseId, show, setShow, reload } = props;

  const { createNotification, isLoading } = useEditCourseStore();

  interface FormData {
    text: string;
    isImportant: boolean;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleClose = () => setShow(false);

  const onSave = (data: FormData) => {
    createNotification(courseId!, { ...data })
      .then(() => {
        reload(courseId!);
      })
      .then(() => {
        setShow(false);
      });
  };

  return (
    <Modal className="mt-5" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Создание уведомления</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              {...register("text", { required: true })}
            />
            {errors.text && (
              <Form.Text className="text-danger">
                Укажите текст уведомления
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="isImportant">
            <Form.Check
              type="checkbox"
              label="Важное"
              {...register("isImportant")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSubmit(onSave)}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Сохраняем...
            </>
          ) : (
            "Сохранить"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
