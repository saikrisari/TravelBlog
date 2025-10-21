import type { FC } from "react";
import "../../styles/scss/blocks/_form.scss";
import "../../styles/scss/blocks/_custom-input.scss";
import "../../styles/scss/blocks/_btn.scss";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/slices/userSlice";
import { login } from "../../api/AuthApi";
import { getUser } from "../../api/UserApi";

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = document.querySelector(".form");

    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      const user = await getUser();

      if (token !== undefined) {
        dispatch(loginUser(user));
      navigate("/profile");
      } else {
        form?.classList.add("form--error");
      return;
      }
      
    } catch (error) {
      form?.classList.add("form--error");
      return;
    }
  };

  return (
    <>
      <Header />
      <div className="form">
        <h1 className="form__header">Вход в профиль</h1>
        <p className="form__error">Неправильный логин или пароль</p>
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
          </div>
          <div className="custom-input">
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
          </div>
          <div className="form__wrapper">
            <Link className="btn" to="/registration">
              Зарегистрироваться
            </Link>
            <input className="btn btn--yellow" type="submit" value={"Войти"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
