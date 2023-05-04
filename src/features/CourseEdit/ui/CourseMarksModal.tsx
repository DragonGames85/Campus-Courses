import { useRequestStore } from "@src/features/StudentRequests";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface CourseMarksModalProps {
  courseId: string | undefined;
  studentId: string | undefined;
  isFinal: boolean;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
}

type FormValues = {
  mark: string;
};

export const CourseMarksModal = (props: CourseMarksModalProps) => {
  const { studentId, isFinal, show, setShow, courseId, reload } = props;

  const { register, handleSubmit } = useForm<FormValues>();

  const { isLoading, setStudentMarks } = useRequestStore();

  const onClose = () => setShow(false);
  const onSave = (data: FormValues) => {
    setStudentMarks(
      courseId!,
      studentId!,
      isFinal ? "Final" : "Midterm",
      data.mark
    )
      .then(() => {
        reload(courseId!);
      })
      .then(() => {
        setShow(false);
      });
  };

  const radioOptions = [
    {
      label: "Пройдено",
      value: "Passed",
    },
    {
      label: "Зафейлено",
      value: "Failed",
    },
  ];

  return (
    <Modal className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isFinal
            ? `Изменение отметки для "Финальная аттестация"`
            : `Изменение отметки для "Промежуточная аттестация"`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          {radioOptions.map(({ label, value }) => (
            <Form.Check
              key={value}
              type={"radio"}
              label={label}
              value={value}
              {...register("mark")}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
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
