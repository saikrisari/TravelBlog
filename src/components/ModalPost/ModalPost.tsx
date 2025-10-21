import type { FC } from "react";
import "../../styles/scss/blocks/_modal.scss";

type ModalProps = {
  onClose: () => void;
};

export const ModalPost: FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__content">
          <p className="modal__text">Ваша история успешно добавлена</p>
          <button className="modal__button" type="button" onClick={onClose}>
            <svg className="modal__icon" width="21" height="24">
              <use href="src/assets/sprite.svg#close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
