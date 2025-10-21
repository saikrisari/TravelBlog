import type { FC } from "react";
import "../../styles/scss/blocks/_form.scss";
import "../../styles/scss/blocks/_custom-input.scss";
import "../../styles/scss/blocks/_btn.scss";
import Header from "../../components/Header/Header";
import { register } from "../../api/AuthApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fields = form.querySelectorAll(".custom-input");
    const passwordField = form.querySelector("#password")?.closest(".custom-input");
    const repeatField = form.querySelector("#repeat")?.closest(".custom-input");
    const emailField = form.querySelector("#email")?.closest(".custom-input");

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

    if (password !== repeatPassword) {
      passwordField?.classList.add("custom-input--error");
      repeatField?.classList.add("custom-input--error");
      hasError = true;
    } else {
      passwordField?.classList.remove("custom-input--error");
      repeatField?.classList.remove("custom-input--error");
    }

    if (hasError) return;

    try {
      await register(email, password);
      navigate("/login");
    } catch (error) {
      emailField?.classList.add("custom-input--error");
    }
  };
  return (
    <>
      <Header />
      <div className="form">
        <h1 className="form__header">Регистрация</h1>
        <form className="form__content" onSubmit={handleSubmit}>
          <div className="custom-input">
            <label className="custom-input__label" htmlFor="email">
              <svg className="custom-input__icon" width="7" height="22">
                <use href="src/assets/sprite.svg#star"></use>
              </svg>
              <span className="custom-input__title">Логин</span>
            </label>
            <input
              className="custom-input__field"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="custom-input__error">
              Аккаунт с данным email уже существует
            </p>
          </div>

          <div className="form__block">
            <div className="custom-input custom-input--half">
              <label className="custom-input__label" htmlFor="password">
                <svg className="custom-input__icon" width="7" height="22">
                  <use href="src/assets/sprite.svg#star"></use>
                </svg>
                <span className="custom-input__title">Пароль</span>
              </label>
              <input
                className="custom-input__field"
                id="password"
                type="password"
                placeholder="Пароль"
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
          <div className="form__wrapper">
            <input
              className="btn btn--yellow"
              type="submit"
              value={"Зарегистрироваться"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
