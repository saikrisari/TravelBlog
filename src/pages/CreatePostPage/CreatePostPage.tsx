import type { FC } from "react";
import { useState } from "react";
import "../../styles/scss/blocks/_form.scss";
import "../../styles/scss/blocks/_custom-input.scss";
import "../../styles/scss/blocks/_btn.scss";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { newPost } from "../../api/PostsApi";
import ModalPost from "../../components/ModalPost/ModalPost";

export const CreatePostPage: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!photo) return;

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("photo", photo);

    await newPost(formData);
    setIsModalOpen(true);
    setTitle("");
    setDescription("");
    setCountry("");
    setCity("");
    setPhoto(null);
    return;
  };

  return (
    <>
      {isModalOpen && <ModalPost onClose={() => setIsModalOpen(false)} />}
      <Header />
      <div className="form">
        <h1 className="form__header">Добавление истории о путешествии</h1>
        <form className="form__content" onSubmit={handleSubmit}>
          <div className="custom-input custom-input--photo">
            <label className="custom-input__label" htmlFor="photo">
              <svg className="custom-input__icon" width="14" height="14">
                <use href="src/assets/sprite.svg#upload"></use>
              </svg>
              <span className="custom-input__title">Загрузите ваше фото</span>
            </label>
            <input
              className="custom-input__field"
              type="file"
              id="photo"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
          </div>
          <div className="custom-input">
            <label className="custom-input__label" htmlFor="title">
              <svg className="custom-input__icon" width="7" height="22">
                <use href="src/assets/sprite.svg#star"></use>
              </svg>
              <span className="custom-input__title">Заголовок</span>
            </label>
            <input
              className="custom-input__field"
              id="title"
              type="text"
              placeholder="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="custom-input__error">Напишите заголовок</p>
          </div>

          <div className="form__block">
            <div className="custom-input custom-input--half">
              <label className="custom-input__label" htmlFor="country">
                <svg className="custom-input__icon" width="7" height="22">
                  <use href="src/assets/sprite.svg#star"></use>
                </svg>
                <span className="custom-input__title">Страна</span>
              </label>
              <input
                className="custom-input__field"
                id="country"
                type="text"
                placeholder="Страна"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <p className="custom-input__error">Напишите название страны</p>
            </div>

            <div className="custom-input custom-input--half">
              <label className="custom-input__label" htmlFor="city">
                <svg className="custom-input__icon" width="7" height="22">
                  <use href="src/assets/sprite.svg#star"></use>
                </svg>
                <span className="custom-input__title">Город</span>
              </label>
              <input
                className="custom-input__field"
                id="city"
                type="text"
                placeholder="Город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <p className="custom-input__error">Напишите название города</p>
            </div>
          </div>
          <div className="custom-input">
            <label className="custom-input__label" htmlFor="comment">
              <svg className="custom-input__icon" width="7" height="22">
                <use href="src/assets/sprite.svg#star"></use>
              </svg>
              <span className="custom-input__title">Описание</span>
            </label>
            <textarea
              className="custom-input__field"
              id="comment"
              placeholder="Добавьте описание вашей истории"
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="custom-input__count">0 / 2000</span>
            <p className="custom-input__error">Добавьте описание</p>
          </div>
          <div className="form__wrapper">
            <Link className="btn btn--arrow" to="/">
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

export default CreatePostPage;
