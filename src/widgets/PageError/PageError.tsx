import { Button } from "react-bootstrap";
import cls from "./PageError.module.scss";

export const PageError = () => {
  const reloadPage = () => {
    location.reload();
  };
  return (
    <div className={cls.PageError}>
      <h2 className="text-dark">Произошла непредвиденная ошибка</h2>
      <Button className="btn btn-primary mt-4" onClick={reloadPage}>
        Перезагрузить
      </Button>
    </div>
  );
};
