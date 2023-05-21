import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEditCourseStore } from "../model/store/editCourse";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface CourseStatusEditModalProps {
  courseId: string | undefined;
  status: string | undefined;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
}

type FormValues = {
  status: string;
};

export const CourseStatusEditModal = (props: CourseStatusEditModalProps) => {
  const { status, show, setShow, courseId, reload } = props;
  const { setCourseStatus, isLoading, isStatusUpdated, statusError } =
    useEditCourseStore();

  const notifySuccess = () => toast("Статус курса изменен");
  const notifyError = () => toast("Произошла ошибка при изменении статуса");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: status,
    },
  });

  const onClose = () => setShow(false);
  const onSave = (data: FormValues) => {
    setCourseStatus(courseId!, data.status);
  };

  const radioOptions = [
    {
      label: "Открыт для записи",
      value: "OpenForAssigning",
      disabled: status === "Started",
      name: "status",
    },
    {
      label: "В процессе",
      value: "Started",
      disabled: status === "Finished",
      name: "status",
    },
    {
      label: "Завершен",
      value: "Finished",
      disabled: false,
      name: "status",
    },
  ];

  useEffect(() => {
    if (isStatusUpdated) {
      notifySuccess();
      reload(courseId!);
      setShow(false);
      useEditCourseStore.setState({
        isStatusUpdated: false,
        statusError: null,
      });
    }
    if (statusError) {
      notifyError();
      useEditCourseStore.setState({
        isStatusUpdated: false,
        statusError: null,
      });
    }
  }, [isStatusUpdated, statusError]);

  return (
    <Modal className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Изменения статуса курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          {radioOptions.map(({ label, value, disabled }) => (
            <Form.Check
              key={value}
              type={"radio"}
              label={label}
              value={value}
              disabled={disabled}
              defaultChecked={status === value}
              {...register("status", {
                validate: (val: string) => val !== status,
                required: true,
              })}
            />
          ))}
          {errors?.status?.type == "required" && (
            <Form.Text className="text-danger">Укажите статус курса</Form.Text>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={errors?.status?.type == "validate"}
            >
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};
