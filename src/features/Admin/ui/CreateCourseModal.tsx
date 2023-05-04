import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { UserList } from "@src/entities/UserList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAdminCourseStore } from "../model/store/adminCourse";

interface CourseCreateModalProps {
  groupId: string | undefined;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
}

interface CourseFormData {
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  semester: string;
  mainTeacherId: string;
}

export const CreateCourseModal = (props: CourseCreateModalProps) => {
  const { groupId, show, setShow, reload } = props;

  const { isLoading, addCourse } = useAdminCourseStore();

  const [requirements, setRequirements] = useState("");
  const [annotations, setAnnotations] = useState("");

  const handleChangeReq = (content: string) => {
    setRequirements(content);
  };
  const handleChangeAnn = (content: string) => {
    setAnnotations(content);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>();

  const onClose = () => setShow(false);

  const onSave = (data: CourseFormData) => {
    addCourse(
      {
        ...data,
        requirements,
        annotations,
        startYear: Number(data.startYear),
        maximumStudentsCount: Number(data.maximumStudentsCount),
      },
      groupId!
    )
      .then(() => {
        reload(groupId!);
      })
      .then(() => {
        setShow(false);
      });
  };

  type RadioOption = {
    label: string;
    value: string;
  };

  const radioOptions: RadioOption[] = [
    { label: "Весений", value: "Spring" },
    { label: "Осенний", value: "Autumn" },
  ];

  return (
    <Modal size="lg" className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          <Form.Group className="mb-3" controlId="formBasicGroupName">
            <Form.Label>Название курса</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <Form.Text className="text-danger">
                Укажите название группы
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicReq">
            <Form.Label>Требования</Form.Label>
            <ReactQuill value={requirements} onChange={handleChangeReq} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAnn">
            <Form.Label>Аннотации</Form.Label>
            <ReactQuill value={annotations} onChange={handleChangeAnn} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSemester">
            <Form.Label>Семестр</Form.Label>
            <Controller
              name="semester"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  {radioOptions.map(option => (
                    <Form.Check
                      key={option.value}
                      type="radio"
                      label={option.label}
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={e => field.onChange(e.target.value)}
                    />
                  ))}
                </div>
              )}
            />

            {errors.semester && (
              <Form.Text className="text-danger">Выберите семестр</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStartYear">
            <Form.Label>Год начала обучения</Form.Label>
            <Form.Control
              type="number"
              {...register("startYear", {
                required: true,
                min: 2000,
                max: 2029,
              })}
            />
            {errors.startYear?.type === "required" && (
              <Form.Text className="text-danger">
                Укажите год начала обучения
              </Form.Text>
            )}
            {errors.startYear?.type === "min" && (
              <Form.Text className="text-danger">
                Год начала обучения не может быть меньше 2000
              </Form.Text>
            )}
            {errors.startYear?.type === "max" && (
              <Form.Text className="text-danger">
                Год начала обучения не может быть больше 2029
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMaxStudentsCount">
            <Form.Label>Максимальное количество студентов</Form.Label>
            <Form.Control
              {...register("maximumStudentsCount", {
                required: true,
                min: 1,
                max: 200,
              })}
              type="number"
            />
            {errors.maximumStudentsCount?.type === "required" && (
              <Form.Text className="text-danger">
                Укажите макс. количество студентов
              </Form.Text>
            )}
            {errors.maximumStudentsCount?.type === "min" && (
              <Form.Text className="text-danger">
                Количество студентов не может быть меньше 1
              </Form.Text>
            )}
            {errors.maximumStudentsCount?.type === "max" && (
              <Form.Text className="text-danger">
                Количество студентов не может быть больше 200
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSemester">
            <Form.Label>Основной преподаватель курса</Form.Label>
            <Controller
              name="mainTeacherId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Select {...field}>
                  <option value="0">Выберите преподавателя</option>
                  <UserList />
                </Form.Select>
              )}
            />
            {errors.mainTeacherId && (
              <Form.Text className="text-danger">
                Выберите основного преподавателя
              </Form.Text>
            )}
          </Form.Group>
        </Form>
        <Modal.Footer>
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
