import React, { useState } from "react";
import HamIcon from "@/component/atoms/hamIcon";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SearchComponent from "@/component/atoms/searchComponent";
import RhsWrapper from "./RhsWrapper";
import NavList from "./navlist";
import Breadcrumbs from "@/component/atoms/breadcrumb";
import styles from "./newNavbar.module.scss";

interface IProps {
  children: JSX.Element;
}

const NewNavBar = (props: IProps) => {
  const { children } = props;
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isNavOpen, setisNavOpen] = useState<boolean>(window.innerWidth > 768);
  const isMobile = useMobileCheck();

  const handleHamClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setisNavOpen((prev) => !prev);
  };

  return (
    <div className={styles.newNavWrapper}>
      <SearchComponent {...{ isSearchActive, setIsSearchActive }} />
      <nav className={styles.navContainer}>
        <div className={styles.lhs_Wrapper}>
          <div className={styles.logoText}>
            <p className={styles.first}>Configuration</p>
            <p className={styles.second}>Panel</p>
          </div>
          <div onClick={(e) => handleHamClick(e)} className={styles.hamBurger}>
            <HamIcon checked={isNavOpen} />
          </div>
          {!isMobile ? (
            <div className={styles.searchIcon}>
              <SearchIcon
                onClick={() => setIsSearchActive((prev) => !prev)}
                color="inherit"
              />
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
      <div className={styles.navListWrapper}>
        <NavList isNavOpen={isNavOpen} />
        <main className={styles.mainWrapper}>
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumbs />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default NewNavBar;
