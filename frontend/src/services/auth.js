import { useHistory } from "react-router-dom";

export const TOKEN_KEY = "@Token";
export const USER_KEY = "@User";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const userAuth = JSON.parse(localStorage.getItem(USER_KEY));

export const login = data => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  window.location.href = "/";
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/";
};
