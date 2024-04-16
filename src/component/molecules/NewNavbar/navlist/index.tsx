import React from "react";
import AccordionCustom from "@/component/atoms/accordionCustom";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Profile, ProfileList } from "./profile";
import Image from "next/image";
import HouseIcon from "@mui/icons-material/House";
import styles from "./navlist.module.scss";

interface IProps {
  isNavOpen: boolean;
}
interface INavListArr {
  topHeading: string;
  subHeaderList: {
    title: string;
    icon?: string | StaticImport;
    iconJsx?: JSX.Element;
  }[];
}
const navListArr: INavListArr[] = [
  {
    topHeading: "Navigation",
    subHeaderList: [
      {
        title: "Dashboard",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
      },
      {
        title: "Page Layout",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
      },
    ],
  },
  {
    topHeading: "UI Elements",
    subHeaderList: [
      { title: "Basics", icon: "", iconJsx: <HouseIcon color="inherit" /> },
      {
        title: "Page Layout",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
      },
    ],
  },
  {
    topHeading: "Forms & Tables",
    subHeaderList: [
      { title: "Charts", icon: "", iconJsx: <HouseIcon color="inherit" /> },
      {
        title: "Page Layout",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
      },
    ],
  },
];

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
            ".Mui-expanded": {
              margin: 0,
            },
          }}
          summaryJsx={<Profile isNavOpen={isNavOpen} />}
          detailsJsx={<ProfileList isNavOpen={isNavOpen} />}
        />
      ) : (
        <Profile isNavOpen={isNavOpen} />
      )}
      <div className={styles.navlist_container}>
        {navListArr.map((listItem: INavListArr, index: number) => {
          const { topHeading, subHeaderList } = listItem;
          return (
            <div className={`${styles.listWrapper}`} key={index}>
              <p className={`${styles.topHeading} ${isNavOpen || styles.hide}`}>
                {topHeading}
              </p>
              {subHeaderList.map((item, ind) => {
                return (
                  <div
                    className={`${styles.subHeaderWrapper} ${
                      isNavOpen || styles.navClosed
                    }`}
                    key={ind}
                  >
                    {item.iconJsx || (
                      <Image
                        src={item.icon || ""}
                        alt="icon"
                        width={50}
                        height={50}
                      />
                    )}
                    <p
                      className={`${styles.subTitle} ${
                        isNavOpen || styles.hide
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavList;
