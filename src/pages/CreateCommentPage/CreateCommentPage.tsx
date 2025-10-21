import type { FC } from "react";
import { useState } from "react";
import "../../styles/scss/blocks/_form.scss";
import "../../styles/scss/blocks/_custom-input.scss";
import "../../styles/scss/blocks/_btn.scss";
import Header from "../../components/Header/Header";
import ModalComment from "../../components/ModalComment/ModalComment";
import { Link, useParams } from "react-router-dom";
import { newComment } from "../../api/PostsApi";

export const CreateCommentPage: FC = () => {
  const { postId } = useParams();
  const [fullName, setFullName] = useState("");
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fields = form.querySelectorAll(".custom-input");

    let hasError = false;

    fields.forEach((field) => {
      const input = field.querySelector("input, textarea") as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (input && input.value === "") {
        field.classList.add("custom-input--error");
        hasError = true;
      } else {
        field.classList.remove("custom-input--error");
      }
    });

    if (hasError) return;

    await newComment(fullName, comment, String(postId));
    setIsModalOpen(true);
    setComment("");
    setFullName("");
    return;
  };

  return (
    <>
      {isModalOpen && <ModalComment onClose={() => setIsModalOpen(false)} />}
      <Header />
      <div className="form">
        <h1 className="form__header">Добавление отзыва</h1>
        <form className="form__content" onSubmit={handleSubmit}>
          <div className="custom-input">
            <label className="custom-input__label" htmlFor="name">
              <svg className="custom-input__icon" width="7" height="22">
                <use href="src/assets/sprite.svg#star"></use>
              </svg>
              <span className="custom-input__title">Ваше имя</span>
            </label>
            <input
              className="custom-input__field"
              id="name"
              type="text"
              placeholder="Ваше имя"
              maxLength={255}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p className="custom-input__error">Напишите имя</p>
          </div>

          <div className="custom-input">
            <label className="custom-input__label" htmlFor="comment">
              <svg className="custom-input__icon" width="7" height="22">
                <use href="src/assets/sprite.svg#star"></use>
              </svg>
              <span className="custom-input__title">Отзыв</span>
            </label>
            <textarea
              className="custom-input__field"
              id="comment"
              placeholder="Добавьте текст отзыва"
              maxLength={600}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <span className="custom-input__count">0 / 600</span>
            <p className="custom-input__error">Добавьте текст отзыва</p>
          </div>
          <div className="form__wrapper">
            <Link className="btn btn--arrow" to={`/post/${postId}`}>
              <svg className="btn__icon" width="24" height="24">
                <use href="src/assets/sprite.svg#arrow"></use>
              </svg>
              <span className="btn__span">Назад</span>
            </Link>
            <input
              className="btn btn--yellow"
              type="submit"
              value={"Сохранить"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCommentPage;
