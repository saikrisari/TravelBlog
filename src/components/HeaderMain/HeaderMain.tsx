import type { FC } from "react";
import "../../styles/scss/blocks/_header.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/index";
import { useNavigate } from "react-router";
import { useState } from "react";
import { logout } from "../../api/AuthApi";
import spriteUrl from "../../assets/sprite.svg";

export const HeaderMain: FC = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleClick = async (action: string) => {
    setMenuOpen(false);
    if (action === "profile") navigate("/profile");
    if (action === "logout") {
      await logout();
      navigate("/");
    }
  };

  return (
    <div className="header header--main">
      <div className="header__wrapper">
        <Link to="/">
          <img
            className="header__logo"
            src="src/assets/logo.png"
            alt="Лого"
            width={181}
            height={41}
          />
        </Link>
        {user.isAuthenticated ? (
          <div className="header__user">
            <button
              className="header__link header__link--active"
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <img
                className="header__photo"
                src={`https://travelblog.skillbox.cc${user.photo}`}
                alt="Фото профиля"
                width={30}
                height={30}
              />
              {user.full_name}
              <svg
                className="header__icon"
                width="14"
                height="11"
                style={{
                  transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <use href={`${spriteUrl}#triangle`}></use>
              </svg>
            </button>
            <ul
              className={`header__menu ${
                isMenuOpen ? "header__menu--active" : ""
              }`}
            >
              <li
                className="header__item"
                onClick={() => handleClick("profile")}
              >
                Профиль
              </li>
              <li
                className="header__item"
                onClick={() => handleClick("logout")}
              >
                Выйти
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="header__link header__link--active"
            type="button"
            onClick={() => navigate("/login")}
          >
            Войти
          </button>
        )}
      </div>
      <p className="header__text">ТАМ, ГДЕ МИР НАЧИНАЕТСЯ С ПУТЕШЕСТВИЙ</p>
    </div>
  );
};

export default HeaderMain;
