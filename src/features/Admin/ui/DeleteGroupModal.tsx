import { Button, Modal, Spinner } from "react-bootstrap";
import { useAdminGroupStore } from "../model/store/adminGroup";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface GroupDeleteModalProps {
  show: boolean;
  chosenID: string;
  chosenName: string;
  setShow: (value: boolean) => void;
  reload: () => void;
}

export const DeleteGroupModal = (props: GroupDeleteModalProps) => {
  const { chosenName, chosenID, show, setShow, reload } = props;

  const { deleteGroup, isLoading, deleteError, isDeleted } =
    useAdminGroupStore();

  const onClose = () => setShow(false);

  const onDelete = () => {
    deleteGroup(chosenID);
  };

  const notifySuccess = () => toast("Группа успешно удалена");
  const notifyError = () => toast("Произошла ошибка при удалении группы");

  useEffect(() => {
    if (isDeleted) {
      notifySuccess();
      reload();
      setShow(false);
      useAdminGroupStore.setState({ isDeleted: false, deleteError: null });
    }
    if (deleteError) {
      notifyError();
      useAdminGroupStore.setState({ isDeleted: false, deleteError: null });
    }
  }, [isDeleted, deleteError]);

  return (
    <Modal className="mt-5" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Удалить группу "${chosenName}" ?`}</Modal.Body>
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
