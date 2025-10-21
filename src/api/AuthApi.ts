import type { IUserInfo } from "../models/interfaces";

const getToken = () => localStorage.getItem("token");

export const register = async (
  email: string,
  password: string
): Promise<IUserInfo> => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const login = async (
  email: string,
  password: string
): Promise<IUserInfo> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  const token = data.token;
  localStorage.setItem("token", token);
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const logout = async (): Promise<IUserInfo> => {
  const response = await fetch("/api/logout", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  return data;
};
