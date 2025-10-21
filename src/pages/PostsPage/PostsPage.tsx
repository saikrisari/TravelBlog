import type { FC } from "react";
import { useState, useEffect } from "react";
import "../../styles/scss/blocks/_posts.scss";
import "../../styles/scss/blocks/_btn.scss";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import type { Posts } from "../../models/interfaces";
import { getPosts } from "../../api/PostsApi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";

export const PostsPage: FC = () => {
  const user = useAppSelector((state) => state.user);
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      <HeaderMain />
      <div className="posts">
        <ul className="posts__list">
          {posts.map((post) => (
            <li className="posts__item" key={post.id}>
              <img
                className="posts__image"
                src={`https://travelblog.skillbox.cc${post.photo}`}
                alt="Фото из поста"
                width={370}
                height={288}
              />
              <div className="posts__description">
                <div className="posts__upper">
                  <p className="posts__title">{post.title}</p>
                  <p className="posts__text">{post.excerpt}</p>
                </div>
                <div className="posts__bottom">
                  <p className="posts__location"></p>
                  <Link className="btn btn--more" to={`post/${post.id}`}>
                    Подробнее
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {user.isAuthenticated && (
          <Link className="btn btn--yellow" to="/newpost">
            Добавить мое путешествие
          </Link>
        )}
      </div>
    </>
  );
};

export default PostsPage;
