import { useState } from "react";
import { Tabs, Tab, ListGroup, Button, Card } from "react-bootstrap";
import { courseState } from "../../model/types/courseState";
import cls from "./CourseInfo.module.scss";
import { Skeleton } from "@src/shared/ui/Skeleton/Skeleton";
import parse from "html-react-parser";
import { BiBellPlus } from "react-icons/bi";

interface CourseInfoProps {
  Course: courseState;
  showModal: (value: boolean) => void;
  isLoading: boolean;
  canEdit: boolean | undefined;
}

export const CourseInfo = (props: CourseInfoProps) => {
  const [info, setInfo] = useState("req");

  const { isLoading, Course, canEdit, showModal } = props;

  if (isLoading)
    return (
      <Card className="mt-4">
        <Card.Body>
          <Skeleton height={"96px"} />
        </Card.Body>
      </Card>
    );
  else
    return (
      <Tabs
        fill
        activeKey={info}
        onSelect={k => setInfo(k as string)}
        className="mt-4"
      >
        <Tab eventKey="req" title="Требования к курсу">
          <div className="border-start border-bottom border-end p-3 text-break bg-white text-black">
            {parse(Course.requirements)}
          </div>
        </Tab>
        <Tab eventKey="ann" title="Аннотация">
          <div className="border-start border-bottom border-end p-3 text-break bg-white text-black">
            {parse(Course.annotations)}
          </div>
        </Tab>
        <Tab eventKey="not" title="Уведомления">
          <ListGroup
            className="border-start border-end border-bottom"
            variant="flush"
          >
            {canEdit && (
              <ListGroup.Item>
                <Button
                  className="d-flex align-items-center"
                  onClick={() => showModal(true)}
                >
                  <BiBellPlus className="me-2" />
                  СОЗДАТЬ УВЕДОМЛЕНИЕ
                </Button>
              </ListGroup.Item>
            )}
            {!Course.notifications.length && (
              <ListGroup.Item className="text-center">
                <h4>Уведомления отсутствуют</h4>
              </ListGroup.Item>
            )}
            {Course.notifications.map(notification => (
              <ListGroup.Item
                className={
                  notification.isImportant ? `${cls.important} text-danger` : ""
                }
                key={notification.text}
              >
                {notification.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    );
};
