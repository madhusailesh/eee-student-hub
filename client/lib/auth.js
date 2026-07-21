import Cookies from "js-cookie";

export const getToken = () => Cookies.get("accessToken");

export const removeToken = () => Cookies.remove("accessToken");

export const isLoggedIn = () => !!getToken();