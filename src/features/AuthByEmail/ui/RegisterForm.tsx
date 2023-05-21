import { FC, memo, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ImProfile } from "react-icons/im";
import { AxiosError } from "axios";

type FormValues = {
  fullName: string;
  password: string;
  birthDate: string;
  email: string;
  confirmPassword: string;
};

interface IRegisterForm {
  registerError: AxiosError<unknown, any> | null;
  isLoading: boolean;
  registerUser: (
    fullName: string,
    email: string,
    birthDate: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

export const RegisterForm: FC<IRegisterForm> = memo(
  ({
    registerError,
    isLoading,
    registerUser,
  }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm<FormValues>({ mode: "onChange" });

    const [showErrors, setShowErrors] = useState(false);

    const password = watch("password", "");

    const onSubmit = handleSubmit(
      ({ fullName, email, birthDate, password, confirmPassword }) => {
        registerUser(fullName, birthDate, email, password, confirmPassword);
      }
    );

    useEffect(() => {
      if (registerError) {
        setShowErrors(true);
      }
    }, [registerError]);

    return (
      <Form onSubmit={onSubmit} className="w-75 h-75 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicFullname">
          <Form.Label>ФИО</Form.Label>
          <Form.Control
            onFocus={() => {
              setShowErrors(false);
            }}
            type="text"
            {...register("fullName", {
              required: true,
              pattern: /^[\p{L}\s'.-]+$/u,
              validate: value => {
                const words = value.trim().split(/\s+/);
                return words.length >= 2 && !/[\p{S}]/u.test(value);
              },
            })}
          />
          {errors.fullName?.type === "required" && (
            <Form.Text className="text-danger">Введите своё ФИО</Form.Text>
          )}
          {errors.fullName?.type === "pattern" && (
            <Form.Text className="text-danger">
              ФИО должно содержать только буквы
            </Form.Text>
          )}
          {errors.fullName?.type === "validate" && (
            <Form.Text className="text-danger">
              ФИО должно состоять минимум из двух слов
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirthDate">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            type="date"
            onFocus={() => {
              setShowErrors(false);
            }}
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
            })}
          />
          {errors.birthDate?.type === "required" && (
            <Form.Text className="text-danger">Введите дату рождения</Form.Text>
          )}
          {errors.birthDate?.type === "validate" && (
            <Form.Text className="text-danger">
              Дата рождения должна быть валидной и не больше 100 лет назад
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onFocus={() => {
              setShowErrors(false);
            }}
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email?.type === "required" && (
            <Form.Text className="text-danger">Email обязателен</Form.Text>
          )}
          {!errors.email && (
            <Form.Text className="text-muted">
              Email будет использоваться для входа в систему
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            onFocus={() => {
              setShowErrors(false);
            }}
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              Введите пароль длиной не менее 8 символов
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Подтверждение пароля</Form.Label>
          <Form.Control
            type="password"
            onFocus={() => {
              setShowErrors(false);
            }}
            {...register("confirmPassword", {
              required: true,
              validate: value => value === password,
            })}
          />
          {errors.confirmPassword?.type === "required" && (
            <Form.Text className="text-danger">
              Введите пароль еще раз
            </Form.Text>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <Form.Text className="text-danger">Пароли не совпадают</Form.Text>
          )}
        </Form.Group>

        <div className="d-flex align-items-center">
          <Button variant="primary" type="submit">
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Регистрируемся...
              </>
            ) : (
              <>
                <ImProfile className="me-2" />
                Зарегистрироваться
              </>
            )}
          </Button>
          {registerError?.response?.status == 409 && showErrors && (
            <Form.Text className="text-danger ms-3">
              Такой Email уже существует
            </Form.Text>
          )}
        </div>
      </Form>
    );
  }
);
