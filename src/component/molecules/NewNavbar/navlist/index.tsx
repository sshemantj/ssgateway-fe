import React from "react";
import AccordionCustom from "@/component/atoms/accordionCustom";
import styles from "./navlist.module.scss";
import { Profile, ProfileList } from "./profile";

interface IProps {
  isNavOpen: boolean;
}

const NavList = (props: IProps) => {
  const { isNavOpen } = props;

  return (
    <div
      className={`${styles.navlist_wrapper} ${isNavOpen ? styles.open : null}`}
    >
      {isNavOpen ? (
        <AccordionCustom
          summarySx={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
          summaryJsx={<Profile isNavOpen={isNavOpen} />}
          detailsJsx={<ProfileList isNavOpen={isNavOpen} />}
        />
      ) : (
        <Profile isNavOpen={isNavOpen} />
      )}
      <ul className={styles.navlist_container}>
        {new Array(10).fill(null).map((_: null, index: number) => {
          return <li>{index}</li>;
        })}
      </ul>
    </div>
  );
};

export default NavList;
