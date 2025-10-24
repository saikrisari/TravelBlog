import type { FC } from "react";
import Header from "../../components/Header/Header";
import "../../styles/scss/blocks/_btn.scss";
import "../../styles/scss/blocks/_profile.scss";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import spriteUrl from "../../assets/sprite.svg"

export const ProfilePage: FC = () => {

  const { full_name, city, bio, photo, isAuthenticated } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__picture">
          <img
            className="profile__image"
            src={`https://travelblog.skillbox.cc${photo}`}
            alt="Фото профиля"
            width={240}
            height={240}
          />
          <Link className="btn btn--link" to={"/profile/edit"}>
            <svg className="profile__icon" width="32" height="32">
              <use href={`${spriteUrl}#photo`}></use>
            </svg>
            Изменить фото
          </Link>
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__title">{full_name}</h1>
            <Link className="profile__edit" to={"/profile/edit"} >
              <svg className="profile__icon-edit" width="32" height="32">
                <use href={`${spriteUrl}#edit`}></use>
              </svg>
            </Link>
          </div>
          <div className="profile__wrapper">
            <div className="profile__data">
              <p className="profile__label">Город:</p>
              <p className="profile__city">{city}</p>
            </div>
            <div className="profile__data">
              <p className="profile__label">О себе:</p>
              <p className="profile__about">
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
