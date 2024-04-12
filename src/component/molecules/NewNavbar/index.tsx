import React from "react";
import styles from "./newNavbar.module.scss";
import HamIcon from "@/component/atoms/hamIcon";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useMobileCheck } from "@/hooks/useMobileCheck";

interface IProps {
  children: JSX.Element;
}

const NewNavBar = (props: IProps) => {
  const { children } = props;
  const isMobile = useMobileCheck();

  return (
    <div className={styles.newNavWrapper}>
      <nav className={styles.navContainer}>
        <div className={styles.lhs_Wrapper}>
          <div className={styles.logoText}>
            <p className={styles.first}>Configuration</p>
            <p className={styles.second}>Panel</p>
          </div>
          <div className={styles.hamBurger}>
            <HamIcon />
          </div>
          {!isMobile ? (
            <div className={styles.searchIcon}>
              <SearchIcon color="inherit" />
            </div>
          ) : null}
        </div>
        {!isMobile ? (
          <RhsWrapper />
        ) : (
          <>
            <div className={styles.m_logoText}>
              <p className={styles.first}>Configuration</p>
              <p className={styles.second}>Panel</p>
            </div>
            <div className={styles.moreIcon}>
              <MoreVertIcon color="inherit" />
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

function RhsWrapper() {
  return (
    <div className={styles.rhs_Wrapper}>
      <div className={styles.notificatin_container}>
        <NotificationsNoneIcon color="inherit" />
      </div>
      <div className={styles.profile_container}>
        <PermIdentityIcon color="inherit" />
      </div>
    </div>
  );
}

export default NewNavBar;
