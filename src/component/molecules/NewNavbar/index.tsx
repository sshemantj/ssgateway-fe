import React from "react";
import styles from "./newNavbar.module.scss";
import HamIcon from "@/component/atoms/hamIcon";

interface IProps {
  children: JSX.Element;
}

const NewNavBar = (props: IProps) => {
  const { children } = props;

  return (
    <div className={styles.newNavWrapper}>
      <nav className={styles.navContainer}>
        <div className={styles.lhs_Wrapper}>
          <HamIcon />
        </div>
        <div className={styles.rhs_Wrapper}></div>
      </nav>
    </div>
  );
};

export default NewNavBar;
