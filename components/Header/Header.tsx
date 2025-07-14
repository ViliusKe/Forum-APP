import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isLoggedIn, logoutUser } from "@/utils/auth";
import Button from "../Button/Button";
import BurgerImg from "../../assets/img/burger-menu-left-svgrepo-com.svg";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(isLoggedIn());
    }
  }, []);
  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
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
            <Button className={styles.insertBtn}>
              <Link href={"/createPost"} className={styles.link}>
                Create a post
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              className={styles.button}
              title={"Logout"}
            ></Button>
          </>
        )}
      </div>

      <button
        className={styles.burgerBtn}
        onClick={() => setMobileMenu((prevState) => !prevState)}
      >
        <img src={BurgerImg.src} />
      </button>
      {isMobileMenu && (
        <div className={styles.overlay}>
          {!loggedIn ? (
            <>
              <Button className={styles.mobileButton}>
                <Link href="/login" className={styles.link}>
                  Login
                </Link>
              </Button>
              <Button className={styles.mobileButton}>
                <Link href="/register" className={styles.link}>
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button className={styles.mobileButton}>
                <Link href={"/createPost"} className={styles.link}>
                  Create a post
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                className={styles.mobileButton}
                title={"Logout"}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
