import { LoginForm } from "@src/features/AuthByEmail";
import { memo } from "react";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container className="p-5">
      <h2 className="text-center">Авторизация</h2>
      <LoginForm />
    </Container>
  );
};

export default memo(LoginPage);
