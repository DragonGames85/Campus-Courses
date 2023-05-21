import { AxiosError } from "axios";
import { FC, memo, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import { useForm } from "react-hook-form";
import { IoEnter } from "react-icons/io5";

type FormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  loginError: AxiosError<unknown, any> | null;
  isLoading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = memo(
  ({ loginError, isLoading, loginUser }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>();

    const [showErrors, setShowErrors] = useState(false);

    const onSubmit = handleSubmit(({ email, password }) => {
      loginUser(email, password);
    });

    useEffect(() => {
      if (loginError) {
        setShowErrors(true);
      }
    }, [loginError]);

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

          {loginError?.response?.status && showErrors && (
            <Form.Text className="text-danger ms-3">
              Неверный Email или пароль
            </Form.Text>
          )}
        </div>
      </Form>
    );
  }
);
