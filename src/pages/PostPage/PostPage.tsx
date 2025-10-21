import type { FC } from "react";
import "../../styles/scss/blocks/_post.scss";
import "../../styles/scss/blocks/_btn.scss";
import "../../styles/scss/blocks/_form.scss";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IComment, IPost } from "../../models/interfaces";
import { getPost, getPostComments } from "../../api/PostsApi";
import { useAppSelector } from "../../store";

export const PostPage: FC = () => {
  const user = useAppSelector((state) => state.user);
  const id = String(location.pathname.split("/").pop());
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    getPost(id).then(setPost);
    getPostComments(id).then(setComments);
  }, [id]);

  return (
    <>
      <Header />
      <div className="post">
        <img
          className="post__image"
          src={`https://travelblog.skillbox.cc${post?.photo}`}
          alt="Фото поста"
          width={1170}
          height={450}
        />
        <div className="post__description">
          <p className="post__title">{post?.title}</p>
          <p className="post__text">{post?.description}</p>
          <ul className="post__comments">
            {comments.map((comment) => (
              <li className="post__comment" key={comment.postId}>
                <p className="post__name">{comment.author_name}</p>
                <p className="post__date">
                  {new Date(comment.created_at).toLocaleDateString("ru-RU")}
                </p>
                <p className="post__review">{comment.comment}</p>
              </li>
            ))}
          </ul>
          <div className="form__wrapper">
            <Link className="btn btn--arrow" to="/">
              <svg className="btn__icon" width="24" height="24">
                <use href="src/assets/sprite.svg#arrow"></use>
              </svg>
              <span className="btn__span">Назад</span>
            </Link>
            {user.isAuthenticated && (
              <Link className="btn btn--yellow" to={`/newcomment/${id}`}>
                Ваше впечатление об этом месте
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
