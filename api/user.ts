import axios from "axios";
import { config } from "../config";

type LoginProps = {
  email: string;
  password: string;
};

type RegistrationProps = LoginProps & {
  userName: string;
};

export const loginUser = async ({ email, password }: LoginProps) => {
  try {
    const loginBody = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${config.BASE_URL}/user/login`,
      loginBody
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const registerUser = async ({
  userName,
  email,
  password,
}: RegistrationProps) => {
  try {
    const registrationbody = {
      userName: userName,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${config.BASE_URL}/user`,
      registrationbody
    );
    return response;
  } catch (err) {
    throw err;
  }
};
