import { UserList } from "@src/entities/UserList";
import { useEditCourseStore } from "@src/features/CourseEdit";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

interface TeacherListModalProps {
  courseId: string | undefined;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
  updateTeachingCourses: () => void;
}

interface CourseFormData {
  teacherId: string;
}

export const TeacherListModal = (props: TeacherListModalProps) => {
  const { courseId, show, setShow, reload, updateTeachingCourses } = props;

  const { isLoading, addTeacher, error } = useEditCourseStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>();

  const onClose = () => setShow(false);

  const onSave = (data: CourseFormData) => {
    addTeacher(courseId!, data.teacherId)
      .then(() => {
        setShow(false);
        reload(courseId!);
        updateTeachingCourses();
      })
      .catch(() => {
        return;
      });
  };

  return (
    <Modal size="lg" className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          <Form.Group className="mb-3" controlId="formBasicSemester">
            <Form.Label>Основной преподаватель курса</Form.Label>
            <Controller
              name="teacherId"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Form.Select {...field}>
                  <option value="0">Выберите преподавателя</option>
                  <UserList />
                </Form.Select>
              )}
            />
            {errors.teacherId && errors.teacherId.type === "required" && (
              <Form.Text className="text-danger">
                Выберите преподавателя из списка
              </Form.Text>
            )}
          </Form.Group>
        </Form>

        <Modal.Footer>
          {/* @ts-ignore */}
          {error?.response?.data?.message ==
            "This user is already teaching at this course." && (
            <Form.Text className="text-danger me-auto">
              Нельзя добавить преподавателя этого же курса
            </Form.Text>
          )}
          {/* @ts-ignore */}
          {error?.response?.data?.message ==
            "Cannot assign teacher role to a student already attending the course." && (
            <Form.Text className="text-danger me-auto">
              Нельзя добавить студента этого же курса
            </Form.Text>
          )}
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSave)}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Добавляем...
              </>
            ) : (
              "Добавить"
            )}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
