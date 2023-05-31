import { RegisterForm, useAuthStore } from "@src/features/AuthByEmail";
import { memo } from "react";
import { Container } from "react-bootstrap";

const RegisterPage = () => {
  const { registerUser, isLoading, registerError } = useAuthStore();

  return (
    <Container className="p-3 text-white">
      <h2 className="text-center">Регистрация нового пользователя</h2>
      <RegisterForm
        registerUser={registerUser}
        isLoading={isLoading}
        registerError={registerError}
      />
    </Container>
  );
};

export default memo(RegisterPage);
