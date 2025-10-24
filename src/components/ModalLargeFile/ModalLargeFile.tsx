import type { FC } from "react";
import "../../styles/scss/blocks/_modal.scss";
import spriteUrl from "../../assets/sprite.svg"
import { useNavigate } from "react-router-dom";

export const ModalLargeFile: FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  }

  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__content">
          <p className="modal__text">Размер файла превышает 5 MB!</p>
          <button className="modal__button" type="button" onClick={handleClick}>
            <svg className="modal__icon" width="21" height="24">
              <use href={`${spriteUrl}#close`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLargeFile;
