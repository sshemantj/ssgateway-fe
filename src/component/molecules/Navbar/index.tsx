import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./navbar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { allRoutes } from "@/constants/allRoutes";
import { useAppSelector } from "@/store/hooks";

interface INavbar {
  showBackBtn?: boolean;
}

const Navbar = ({ showBackBtn = false }: INavbar) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isShowNav, setIsShowNav] = useState(false);
  const router = useRouter();
  const showBack = router.query.showBack;
  const { showBackInNavbar } = useAppSelector((state) => state.menu);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleBackBtnShow = () => {
    let show: any = showBackBtn || showBack;
    if (showBackInNavbar !== null) {
      show = showBackInNavbar;
    }
    return show;
  };

  useEffect(() => {
    const result = handleBackBtnShow();
    setIsShowNav(result);
  }, [showBackBtn, showBack, showBackInNavbar]);

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <Link href={allRoutes.HOME}>
          <div className={styles.logo}>
            {isShowNav ? (
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
        </Link>
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
