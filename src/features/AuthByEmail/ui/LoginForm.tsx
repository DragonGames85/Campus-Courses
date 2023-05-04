import { memo, useEffect, useState } from "react";
import { Button, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../model/store/AuthUser";
import { useNavigate } from "react-router-dom";
import { IoEnter } from "react-icons/io5";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { loginUser, isLoading, error } = useAuthStore();

  const [showErrors, setShowErrors] = useState(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(({ email, password }) => {
    loginUser(email, password, navigate, setShowErrors);
  });

  return (
    <Form onSubmit={onSubmit} className="w-50 align-self-center mx-auto">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onFocus={() => {
            setShowErrors(false);
          }}
          {...register("email", {
            required: true,
          })}
        />
        {errors.email?.type === "required" && (
          <Form.Text className="text-danger">Введите email</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          onFocus={() => {
            setShowErrors(false);
          }}
          type="password"
          className="mb-2"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password?.type === "required" && (
          <Form.Text className="text-danger">Введите пароль</Form.Text>
        )}
        {errors.password?.type === "minLength" && (
          <Form.Text className="text-danger">
            Пароль должен содержать минимум 8 символов
          </Form.Text>
        )}
      </Form.Group>

      <div className="d-flex align-items-center">
        <Button
          className="d-flex align-items-center"
          variant="primary"
          type="submit"
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Входим...
            </>
          ) : (
            <>
              <IoEnter className="me-2" />
              Войти
            </>
          )}
        </Button>

        {error?.response?.status && showErrors && (
          <Form.Text className="text-danger ms-3">
            Неверный Email или пароль
          </Form.Text>
        )}
      </div>
    </Form>
  );
});
