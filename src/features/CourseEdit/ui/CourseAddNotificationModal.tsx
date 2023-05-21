import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useEditCourseStore } from "../model/store/editCourse";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface NotificationModalProps {
  courseId: string | undefined;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
}

interface FormData {
  text: string;
  isImportant: boolean;
}

export const CourseAddNotificationModal = (props: NotificationModalProps) => {
  const { courseId, show, setShow, reload } = props;

  const {
    createNotification,
    isLoading,
    notificationError,
    isNotificationCreated,
  } = useEditCourseStore();

  const notifySuccess = () => toast("Уведомление успешно создано");
  const notifyError = () => toast("Произошла ошибка при создании уведомления");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleClose = () => setShow(false);

  const onSave = (data: FormData) => {
    createNotification(courseId!, { ...data });
  };

  useEffect(() => {
    if (isNotificationCreated) {
      notifySuccess();
      reload(courseId!);
      setShow(false);
      useEditCourseStore.setState({
        isNotificationCreated: false,
        notificationError: null,
      });
    }
    if (notificationError) {
      notifyError();
      useEditCourseStore.setState({
        isNotificationCreated: false,
        notificationError: null,
      });
    }
  }, [isNotificationCreated, notificationError]);

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
