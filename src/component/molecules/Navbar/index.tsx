import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./navbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const router = useRouter();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            width={150}
            height={100}
            src="https://prodstatic.shoppersstop.com/_ui/updated_path/images/shopperstopimgaes_web/newLogo.svg"
            alt="logo"
          />
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
                className={router.pathname === "/" ? "active" : ""}
                href="/"
                passHref
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname === "/about" ? "active" : ""}
                href="/login"
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
