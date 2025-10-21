import type { Posts, IPost, IComment } from "../models/interfaces";

const getToken = () => localStorage.getItem("token");

export const getPosts = async (): Promise<Posts> => {
  const response = await fetch("/api/posts");
  const data = await response.json();
  return data;
};

export const getPost = async (id: string): Promise<IPost> => {
  const response = await fetch(`/api/posts/${id}`);
  const data = await response.json();
  return data;
};

export const getPostComments = async (id: string): Promise<IComment[]> => {
  const response = await fetch(`/api/posts/${id}/comments`);
  const data = await response.json();
  return data;
};

export const newPost = async (formData: FormData): Promise<IPost> => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const newComment = async (
  full_name: string,
  comment: string,
  id: string
): Promise<IComment> => {
  const response = await fetch(`/api/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ full_name, comment }),
  });
  const data = await response.json();
  return data;
};
