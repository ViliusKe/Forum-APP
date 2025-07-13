import Cookies from "js-cookie";

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;

  const Cookies = require("js-cookie");
  return !!Cookies.get("Forum-app-user-token");
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;

  const Cookies = require("js-cookie");
  Cookies.remove("Forum-app-user-token");
};
