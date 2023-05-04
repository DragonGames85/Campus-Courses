import { RegisterForm } from "@src/features/AuthByEmail";
import { memo } from "react";
import { Container } from "react-bootstrap";

const RegisterPage = () => {
  return (
    <Container className="p-3">
      <h2 className="text-center">Регистрация нового пользователя</h2>
      <RegisterForm />
    </Container>
  );
};

export default memo(RegisterPage);
