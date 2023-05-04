import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAdminGroupStore } from "../model/store/adminGroup";

interface GroupEditModalProps {
  show: boolean;
  chosenID: string;
  chosenName: string;
  setShow: (value: boolean) => void;
  reload: () => void;
}

export const EditGroupModal = (props: GroupEditModalProps) => {
  const { chosenID, chosenName, show, setShow, reload } = props;

  const [nameField, setNameField] = useState(chosenName);

  useEffect(() => {
    setNameField(chosenName);
  }, [chosenName]);

  const { updateGroup, isLoading } = useAdminGroupStore();

  const { register, handleSubmit } = useForm();

  const onClose = () => {
    setShow(false);
  };

  const onSave = () => {
    updateGroup(chosenID, nameField)
      .then(() => {
        reload();
      })
      .then(() => {
        setShow(false);
      });
  };

  return (
    <Modal className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSave)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Название группы</Form.Label>
            <Form.Control
              {...(register("name"),
              {
                onChange: e => {
                  setNameField(e.target.value);
                },
              })}
              value={nameField}
              type="text"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button
          disabled={nameField === chosenName}
          variant="primary"
          onClick={handleSubmit(onSave)}
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
    </Modal>
  );
};
