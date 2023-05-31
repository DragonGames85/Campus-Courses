import { memo } from "react";
import campus from "@src/shared/assets/campus.png";
const MainPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <h2
        style={{
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
        className="text-center text-white w-100 mb-3"
      >
        Добро пожаловать в систему кампусных курсов
      </h2>

      <img width={500} src={campus} alt="campus"></img>
    </div>
  );
};

export default memo(MainPage);
