import { Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEditCourseStore } from "../model/store/editCourse";
import { toast } from "react-toastify";

interface CourseInfoEditModalProps {
  courseId: string | undefined;
  courseAnnotations: string | undefined;
  courseRequirements: string | undefined;
  show: boolean;
  setShow: (value: boolean) => void;
  reload: (id: string) => void;
}

export const CourseInfoEditModal = (props: CourseInfoEditModalProps) => {
  const {
    courseId,
    courseAnnotations,
    courseRequirements,
    show,
    setShow,
    reload,
  } = props;

  const [requirements, setRequirements] = useState("");
  const [annotations, setAnnotations] = useState("");

  useEffect(() => {
    setRequirements(courseRequirements!);
    setAnnotations(courseAnnotations!);
  }, [courseId]);

  const { editCourseInfo, isLoading, infoError, isInfoUpdated } =
    useEditCourseStore();
  const handleClose = () => setShow(false);

  const handleChangeReq = (content: string) => {
    setRequirements(content);
  };

  const handleChangeAnn = (content: string) => {
    setAnnotations(content);
  };

  const onSave = () => {
    editCourseInfo(courseId!, requirements!, annotations!)
  };

  const notifySuccess = () => toast("Информация о курсе изменена");
  const notifyError = () => toast("Произошла ошибка при редактировании курса");

  useEffect(() => {
    if (isInfoUpdated) {
      notifySuccess();
      reload(courseId!);
      setShow(false);
      useEditCourseStore.setState({ isInfoUpdated: false, infoError: null });
    }
    if (infoError) {
      notifyError();
      useEditCourseStore.setState({ isInfoUpdated: false, infoError: null });
    }
  }, [isInfoUpdated, infoError]);

  return (
    <Modal className="mt-5" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Требования</p>
        <ReactQuill value={requirements} onChange={handleChangeReq} />
        <p className="mt-3">Аннотации</p>
        <ReactQuill value={annotations} onChange={handleChangeAnn} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={onSave}>
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
