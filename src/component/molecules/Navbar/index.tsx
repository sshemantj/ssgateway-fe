import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import hamsvg from "@/images/ham.svg";
import logosvg from "@/images/logo.svg";
import {
  bagIcon,
  barCodeScanIcon,
  heartIcon,
  searchIcon,
} from "@/images/AllDataIcons";
import LogoutModal from "../LogoutModal";

import { getUserChannelMappings } from "@/services/thunks/tableApis";
import styles from "./navbar.module.scss";
import NavFields from "./NavFields";

interface INavbar {
  showBackBtn?: boolean;
  showApprovedFields?: boolean;
}

const Navbar = ({
  showBackBtn = false,
  showApprovedFields = false,
}: INavbar) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isShowNav, setIsShowNav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { showBackInNavbar } = useAppSelector((state) => state.menu);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const showBack = router.query.showBack;

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

  useEffect(() => {
    if (showApprovedFields) dispatch(getUserChannelMappings());
  }, []);

  const handleLogoClick = () => {
    router.reload();
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.container}>
        <div className={styles.lhsWrapper}>
          {isShowNav || (
            <div
              className={styles["menu-icon"]}
              onClick={() => handleShowNavbar()}
            >
              <Image src={hamsvg} alt="hamberger" width={20} height={20} />
            </div>
          )}
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
                style={{ cursor: "pointer" }}
                onClick={() => handleLogoClick()}
                width={150}
                height={100}
                src={logosvg}
                alt="logo"
              />
            )}
          </div>
          {showApprovedFields ? <NavFields /> : null}
        </div>
        <div className={styles.rhsWrapper}>
          <div className={styles.barcodeIcon}>
            <Image src={barCodeScanIcon} alt="barcode" width={25} height={25} />
          </div>
          <div className={styles.searchIcon}>
            <Image src={searchIcon} alt="search" width={25} height={25} />
          </div>
          <div className={styles.heartIcon}>
            <Image src={heartIcon} alt="liked" width={25} height={25} />
          </div>
          <div className={styles.searchIcon}>
            <Image src={bagIcon} alt="bag" width={25} height={25} />
          </div>
        </div>
        <div
          className={`${styles["nav-elements"]}  ${
            showNavbar && styles.active
          }`}
        >
          <ul>
            <li
              onClick={() => setOpenModal(true)}
              style={{ fontWeight: 600, cursor: "pointer" }}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <LogoutModal {...{ openModal, setOpenModal }} />
    </nav>
  );
};

export default Navbar;
