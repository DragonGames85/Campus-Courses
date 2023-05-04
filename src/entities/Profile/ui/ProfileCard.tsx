import { ErrorCard } from "@src/shared/ui/ErrorCard/ErrorCard";
import { Skeleton } from "@src/shared/ui/Skeleton/Skeleton";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsSave } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { profileSchema } from "../model/types/profileSchema";

type FormValues = {
  fullName: string;
  birthDate: string;
};

export const ProfileCard = (
  props: Omit<profileSchema, "isAuth" | "getProfile" | "success">
) => {
  const { profile, isLoading, error, putProfile } = props;

  const [readOnly, setReadOnly] = useState(false);
  const [fullname, setFullname] = useState(profile?.fullName);
  const [birthDate, setBirthDate] = useState(profile?.birthDate.slice(0, 10));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(({ fullName, birthDate }) => {
    if (
      profile?.fullName.toString() == fullName.toString() &&
      profile?.birthDate.slice(0, 10) == birthDate
    ) {
      setReadOnly(!readOnly);
    } else {
      putProfile(fullName, birthDate);
    }
    setReadOnly(!readOnly);
  });

  const onClick = () => {
    setReadOnly(!readOnly);
  };

  if (error) {
    return <ErrorCard text="Произошла ошибка при загрузке пользователя" />;
  } else if (isLoading || !profile) {
    return (
      <>
        <Skeleton height={"38px"} className="mb-4 mt-4" />
        <Skeleton height={"38px"} className="mb-4" />
        <Skeleton height={"38px"} className="mb-4" />
        <div className="d-flex justify-content-center">
          <Skeleton width={102} border={"0.375rem"} />
        </div>
      </>
    );
  } else
    return (
      <>
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group as={Row} className="mb-4" controlId="formBasicFullname">
            <Form.Label column sm={2}>
              ФИО
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={fullname}
                placeholder="Введите своё ФИО"
                readOnly={!readOnly}
                {...register("fullName", {
                  required: true,
                  pattern: /^[\p{L}\s'.-]+$/u,
                  validate: value => {
                    const words = value.trim().split(/\s+/);
                    return words.length >= 2 && !/[\p{S}]/u.test(value);
                  },
                  onChange: e => {
                    setFullname(e.target.value);
                  },
                })}
              />
            </Col>
            {errors.fullName?.type === "required" && (
              <Form.Text className="text-danger text-center">
                Введите своё ФИО
              </Form.Text>
            )}
            {errors.fullName?.type === "pattern" && (
              <Form.Text className="text-danger text-center">
                ФИО должно содержать только буквы
              </Form.Text>
            )}
            {errors.fullName?.type === "validate" && (
              <Form.Text className="text-danger text-center">
                ФИО должно состоять минимум из двух слов
              </Form.Text>
            )}
          </Form.Group>

          <Row className="mb-4">
            <Col sm={2}>Email</Col>
            <Col sm={10}>{profile?.email}</Col>
          </Row>

          <Form.Group as={Row} className="mb-4" controlId="formBasicBirthDate">
            <Form.Label column sm={2}>
              Дата рождения
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type={"date"}
                readOnly={!readOnly}
                value={birthDate}
                placeholder="Введите дату рождения"
                {...register("birthDate", {
                  required: true,
                  validate: value => {
                    const date = new Date(value);
                    const currentDate = new Date();
                    const minDate = new Date().setFullYear(
                      currentDate.getFullYear() - 100
                    );
                    return (
                      date.getTime() <= currentDate.getTime() &&
                      date.getTime() >= minDate
                    );
                  },
                  onChange: e => {
                    setBirthDate(e.target.value);
                  },
                })}
              />
            </Col>
            {errors.birthDate?.type === "required" && (
              <Form.Text className="text-danger text-center">
                Введите дату рождения
              </Form.Text>
            )}
            {errors.birthDate?.type === "validate" && (
              <Form.Text className="text-danger text-center">
                Дата рождения должна быть валидной и не больше 100 лет назад
              </Form.Text>
            )}
          </Form.Group>
        </Form>

        <div className="d-flex justify-content-center">
          {readOnly ? (
            <Button variant="success">
              <div className="d-flex align-items-center" onClick={onSubmit}>
                <BsSave className="me-2" />
                Сохранить
              </div>
            </Button>
          ) : (
            <Button variant="primary" type="reset" onClick={onClick}>
              <div className="d-flex align-items-center">
                <IoCreateOutline className="me-2" />
                Редактировать
              </div> 
            </Button>
          )}
        </div>
      </>
    );
};