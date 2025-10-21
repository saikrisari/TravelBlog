import type { IUserInfo } from "../models/interfaces";

const getToken = () => localStorage.getItem("token");

export const getUser = async (): Promise<IUserInfo> => {
  const response = await fetch("/api/user", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  return data;
};

export const editProfile = async (formData: FormData): Promise<IUserInfo> => {
  const response = await fetch("/api/user", {
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

export const changePassword = async (password: string): Promise<IUserInfo> => {
  const response = await fetch("/api/user/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ password }),
  });
  const data = await response.json();
  return data;
};
