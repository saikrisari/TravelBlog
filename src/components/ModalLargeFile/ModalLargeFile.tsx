import type { FC } from "react";
import "../../styles/scss/blocks/_modal.scss";
import spriteUrl from "../../assets/sprite.svg"

type ModalProps = {
  onClose: () => void;
};

export const ModalLargeFile: FC<ModalProps> = ({ onClose }) => {

  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__content">
          <p className="modal__text">Размер файла превышает 5 MB!</p>
          <button className="modal__button" type="button" onClick={onClose}>
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
