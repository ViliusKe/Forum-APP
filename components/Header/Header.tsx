import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn, logoutUser } from "@/utils/auth";
import Button from "../Button/Button";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(isLoggedIn());
    }
  }, []);
  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    // router.push("/login");
  };

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.title}>
        <h1>Project Forum</h1>
      </Link>
      <div className={styles.buttonWrapper}>
        {!loggedIn ? (
          <>
            <Button className={styles.button}>
              <Link href="/login" className={styles.link}>
                Login
              </Link>
            </Button>
            <Button className={styles.button}>
              <Link href="/register" className={styles.link}>
                Register
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleLogout}
              className={styles.button}
              title={"Logout"}
            ></Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
