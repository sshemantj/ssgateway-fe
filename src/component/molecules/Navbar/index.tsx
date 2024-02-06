import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./navbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { allRoutes } from "@/constants/allRoutes";

interface INavbar {
  showBackBtn?: boolean;
}

const Navbar = ({ showBackBtn = false }: INavbar) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const router = useRouter();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {showBackBtn ? (
            <Button
              variant="text"
              color="inherit"
              onClick={() => router.back()}
            >
              <KeyboardBackspaceIcon /> <span>back</span>
            </Button>
          ) : (
            <Image
              width={150}
              height={100}
              src="https://prodstatic.shoppersstop.com/_ui/updated_path/images/shopperstopimgaes_web/newLogo.svg"
              alt="logo"
            />
          )}
        </div>
        <div className={styles["menu-icon"]} onClick={() => handleShowNavbar()}>
          <MenuIcon />
        </div>
        <div
          className={`${styles["nav-elements"]}  ${
            showNavbar && styles.active
          }`}
        >
          <ul>
            <li>
              <Link
                className={
                  router.pathname === allRoutes.HOME ? styles.active : ""
                }
                href={allRoutes.HOME}
                passHref
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={
                  router.pathname === allRoutes.LOGIN ? styles.active : ""
                }
                href={allRoutes.LOGIN}
                passHref
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
