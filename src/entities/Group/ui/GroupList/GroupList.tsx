import { ErrorCard } from "@src/shared/ui/ErrorCard/ErrorCard";
import { Skeleton } from "@src/shared/ui/Skeleton/Skeleton";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { groupSchema } from "../../model/types/groupSchema";
import cls from "./GroupList.module.scss";

interface GroupListProps extends groupSchema {
  isAdmin: boolean | undefined;
  showEditModal: (value: boolean) => void;
  showDeleteModal: (value: boolean) => void;
  setChosenID: (value: string) => void;
  setChosenName: (value: string) => void;
}

export const GroupList = (props: Omit<GroupListProps, "getGroups">) => {
  const navigate = useNavigate();
  const {
    groups,
    isLoading,
    error,
    isAdmin,
    success,
    showEditModal,
    showDeleteModal,
    setChosenID,
    setChosenName,
  } = props;

  const onDelete = (e: any, id: string, name: string) => {
    e.stopPropagation();
    setChosenName(name);
    setChosenID(id);
    showDeleteModal(true);
  };

  const onEdit = (e: any, id: string, name: string) => {
    e.stopPropagation();
    setChosenName(name);
    setChosenID(id);
    showEditModal(true);
  };

  if (isLoading) {
    return (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Skeleton width="100%" height="88px" />
          </ListGroup.Item>
          <ListGroup.Item>
            <Skeleton width="100%" height="88px" />
          </ListGroup.Item>
          <ListGroup.Item>
            <Skeleton width="100%" height="88px" />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  } else if (error) {
    return <ErrorCard text="Произошла ошибка при загрузке групп" />;
  } else if (!groups.length && success) {
    return <ErrorCard text="Список групп пуст" />;
  } else
    return (
      <Card className="mb-5">
        <ListGroup variant="flush">
          {groups.map(group => (
            <ListGroup.Item
              key={group.id}
              className={cls.group}
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              <Row>
                <Col className="justify-content-center">
                  <MdGroup className="me-2" />
                  {group.name}
                </Col>
                {isAdmin && (
                  <Col className="text-end">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={e => onEdit(e, group.id, group.name)}
                    >
                      <div className="d-flex">
                        <IoCreateOutline className="me-2 align-self-center" />
                        Редактировать
                      </div>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={e => onDelete(e, group.id, group.name)}
                    >
                      <BsTrash className="me-2" />
                      Удалить
                    </Button>
                  </Col>
                )}
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    );
};
