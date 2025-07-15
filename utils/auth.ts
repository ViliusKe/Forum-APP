import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const isLoggedIn = (): boolean => {
  return !!Cookies.get("Forum-app-user-token");
};

export const logoutUser = () => {
  Cookies.remove("Forum-app-user-token");
};

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};
