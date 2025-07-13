import Cookies from "js-cookie";

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!Cookies.get("Forum-app-user-token");
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;
  Cookies.remove("Forum-app-user-token");
};
