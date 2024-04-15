import React from "react";
import styles from "./navlist.module.scss";

interface IProps {
  isNavOpen: boolean;
}

const NavList = (props: IProps) => {
  const { isNavOpen } = props;

  console.log(isNavOpen);
  return (
    <div className={styles.navlist_wrapper}>
      <ul
        className={`${styles.navlist_container} ${
          isNavOpen ? styles.open : null
        }`}
      >
        {new Array(10).fill(null).map((_: null, index: number) => {
          return <li>{index}</li>;
        })}
      </ul>
    </div>
  );
};

export default NavList;
