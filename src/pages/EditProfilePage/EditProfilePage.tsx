import type { FC } from "react";
import Header from "../../components/Header/Header";
import "../../styles/scss/blocks/_btn.scss";
import "../../styles/scss/blocks/_profile.scss";
import "../../styles/scss/blocks/_form.scss";
import "../../styles/scss/blocks/_custom-input.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { changePassword, editProfile } from "../../api/UserApi";
import { updateUser } from "../../store/slices/userSlice";
import { useState, useEffect } from "react";

export const ProfilePage: FC = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [full_name, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [prevPhoto, setPrevPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    setFullName(user.full_name);
    setCity(user.city);
    setBio(user.bio);
    setPrevPhoto(user.photo);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const passwordField = form
      .querySelector("#password")
      ?.closest(".custom-input");
    const repeatField = form.querySelector("#repeat")?.closest(".custom-input");

    let hasError = false;

    if (password !== repeatPassword) {
      passwordField?.classList.add("custom-input--error");
      repeatField?.classList.add("custom-input--error");
      hasError = true;
    } else {
      passwordField?.classList.remove("custom-input--error");
      repeatField?.classList.remove("custom-input--error");
    }

    if (hasError) return;

    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("bio", bio);
    formData.append("city", city);

    if (photo) {
      formData.append("photo", photo);
    }

    if (password) {
      await changePassword(password);
    }

    const updatedUser = await editProfile(formData);
    dispatch(updateUser(updatedUser));
    navigate("/profile");
    return;
  };

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__picture">
          <img
            className="profile__image"
            src={`https://travelblog.skillbox.cc${prevPhoto}`}
            alt="Фото профиля"
            width={240}
            height={240}
          />
          <label className="btn btn--link" htmlFor="photo">
            <svg className="profile__icon" width="32" height="32">
              <use href="src/assets/sprite.svg#photo"></use>
            </svg>
            Изменить фото
          </label>
        </div>
        <form className="form__content" onSubmit={handleSubmit}>
          <input
            className="profile__input"
            type="file"
            id="photo"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setPhoto(file);
              if (file) {
                setPrevPhoto(URL.createObjectURL(file));
              }
            }}
          />
          <div className="custom-input">
            <label className="custom-input__label" htmlFor="name">
              <svg className="custom-input__icon" width="7" height="22">
                <use href="src/assets/sprite.svg#star"></use>
              </svg>
              <span className="custom-input__title">ФИО</span>
            </label>
            <input
              className="custom-input__field"
              id="name"
              type="text"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="custom-input">
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="custom-input">
            <label className="custom-input__label" htmlFor="about">
              <span className="custom-input__title">О себе</span>
            </label>
            <textarea
              className="custom-input__field"
              id="about"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <span className="custom-input__count">0 / 600</span>
            <p className="custom-input__error">Добавьте описание</p>
          </div>

          <div className="form__bottom">
            <h2 className="form__bottom-header">Смена пароля</h2>
            <div className="form__block">
              <div className="custom-input custom-input--half">
                <label className="custom-input__label" htmlFor="password">
                  <svg className="custom-input__icon" width="7" height="22">
                    <use href="src/assets/sprite.svg#star"></use>
                  </svg>
                  <span className="custom-input__title">Новый пароль</span>
                </label>
                <input
                  className="custom-input__field"
                  id="password"
                  type="password"
                  placeholder="Новый пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="custom-input__error">Пароли не совпадают</p>
              </div>

              <div className="custom-input custom-input--half">
                <label className="custom-input__label" htmlFor="repeat">
                  <svg className="custom-input__icon" width="7" height="22">
                    <use href="src/assets/sprite.svg#star"></use>
                  </svg>
                  <span className="custom-input__title">Повторите пароль</span>
                </label>
                <input
                  className="custom-input__field"
                  id="repeat"
                  type="password"
                  placeholder="Повторите пароль"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form__wrapper">
            <Link className="btn" to={"/profile"}>
              Назад
            </Link>
            <input
              type="submit"
              className="btn btn--yellow"
              value={"Сохранить"}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
