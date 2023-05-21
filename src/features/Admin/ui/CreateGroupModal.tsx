import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAdminGroupStore } from "../model/store/adminGroup";
import { toast } from "react-toastify";

interface GroupCreateModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  reload: () => void;
}

export const CreateGroupModal = (props: GroupCreateModalProps) => {
  const { show, setShow, reload } = props;

  const { isLoading, addGroup, createError, isCreated } = useAdminGroupStore();

  const [nameField, setNameField] = useState("");

  const { register, handleSubmit } = useForm();

  const onClose = () => setShow(false);
  const onSave = () => {
    addGroup(nameField);
  };

  const notifySuccess = () => toast("Группа успешно добавлена");
  const notifyError = () => toast("Произошла ошибка при добавлении группы");

  useEffect(() => {
    if (isCreated) {
      notifySuccess();
      reload();
      setShow(false);
      useAdminGroupStore.setState({ isCreated: false, createError: null });
    }
    if (createError) {
      notifyError();
      useAdminGroupStore.setState({ isCreated: false, createError: null });
    }
  }, [isCreated, createError]);

  return (
    <Modal className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить группу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Название группы</Form.Label>
            <Form.Control
              {...register("name")}
              value={nameField}
              onChange={e => setNameField(e.target.value)}
              type="text"
            />
          </Form.Group>
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
              Добавляем...
            </>
          ) : (
            "Добавить"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
