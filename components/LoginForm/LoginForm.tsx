import { loginUser } from "@/api/user";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const onLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onLogin = async () => {
    try {
      const response = await loginUser({ email: email, password: password });

      setErrorMessage("");
      Cookies.set("Forum-app-user-token", response.data.jwt);
      router.push("/");
    } catch (err) {
      // @ts-expect-error will fix this later
      if (err.status === 401) {
        setErrorMessage("Wrong email or password");
      }
      // @ts-expect-error will fix this later
      console.log(err.status);
    }
  };
  return (
    <div className={styles.container}>
      <h2>Log in</h2>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={onLogin}
          title={"Login"}
          className={styles.loginBtn}
        ></Button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
      <Link href="/register" className={styles.registerLink}>
        Do not have an account? Register here
      </Link>
    </div>
  );
};

export default onLogin;
