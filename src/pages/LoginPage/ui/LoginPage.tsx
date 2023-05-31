import { LoginForm, useAuthStore } from "@src/features/AuthByEmail";
import { memo } from "react";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  const { loginUser, isLoading, loginError } = useAuthStore();
  
  return (
    <Container className="p-5 text-white">
      <h2 className="text-center">Авторизация</h2>
      <LoginForm
        loginUser={loginUser}
        isLoading={isLoading}
        loginError={loginError}
      />
    </Container>
  );
};

export default memo(LoginPage);
