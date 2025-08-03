import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/api/user";
import Cookies from "js-cookie";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const response = await registerUser({
        userName: userName,
        email: email,
        password: password,
      });

      setErrorMessage("");
      Cookies.set("Forum-app-user-token", response.data.jwt);
      router.push("/");
    } catch (err) {
      console.log(err);
      // @ts-expect-error will fix this later
      if (err.status === 409) {
        setErrorMessage("User already exists");
      }
      // @ts-expect-error will fix this later
      if (err.status === 500) {
        setErrorMessage("Check if provided email is correct");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.registerTitle}>Join our forum</h2>
      <div className={styles.formWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="First name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          title="Register"
          className={styles.registerBtn}
          onClick={onSubmit}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
      <Link href="/login" className={styles.loginLink}>
        Have an account already? Login here
      </Link>
    </div>
  );
};

export default RegistrationForm;
