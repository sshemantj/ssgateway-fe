import React from "react";
import AccordionCustom from "@/component/atoms/accordionCustom";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Profile, ProfileList } from "./profile";
import Image from "next/image";
import HouseIcon from "@mui/icons-material/House";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ServiceIcon from "@mui/icons-material/HomeRepairService";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import QueueIcon from "@mui/icons-material/Queue";
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
    topHeading: "Listing",
    subHeaderList: [
      {
        title: "Unapproved",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
      },
      {
        title: "Approved",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
      },
    ],
  },
  {
    topHeading: "File management",
    subHeaderList: [
      {
        title: "Upload pending data",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
      },
      {
        title: "View pending approval data",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
      },
    ],
  },
  {
    topHeading: "User profile",
    subHeaderList: [
      {
        title: "Update password",
        icon: "",
        iconJsx: <FolderCopyIcon color="inherit" />,
      },
      {
        title: "Update Profile",
        icon: "",
        iconJsx: <ServiceIcon color="inherit" />,
      },
    ],
  },
  {
    topHeading: "Manage Channels",
    subHeaderList: [
      {
        title: "Add",
        icon: "",
        iconJsx: <OfflineBoltIcon color="inherit" />,
      },
      {
        title: "Update",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
      },
      {
        title: "View All Channels",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
      },
    ],
  },
  {
    topHeading: "Channel Mapping",
    subHeaderList: [
      {
        title: "View User channel",
        icon: "",
        iconJsx: <OfflineBoltIcon color="inherit" />,
      },
      {
        title: "Map User with channels",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
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
