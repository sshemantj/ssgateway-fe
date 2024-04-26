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
import { useSearchParams } from "next/navigation";
import { IProductsTypes } from "@/interfaces/product";
import { useRouter } from "next/router";
import { IAllRoutes, IAllSubRoutes } from "@/constants/allRoutes";
import styles from "./navlist.module.scss";

interface IProps {
  isNavOpen: boolean;
  handleTypeClick: (value: any, path?: any) => void;
}

interface ISubHeaderList {
  title: string;
  icon?: string | StaticImport;
  iconJsx?: JSX.Element;
  value?: string;
  path?: string;
}
interface INavListArr {
  topHeading: string;
  subHeaderList: ISubHeaderList[];
}
const navListArr: INavListArr[] = [
  {
    topHeading: "Listing",
    subHeaderList: [
      {
        title: "Unapproved",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
        value: IProductsTypes.UNAPPROVED,
        path: "/",
      },
      {
        title: "Approved",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        value: IProductsTypes.APPROVED,
        path: "/",
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
        value: "upload_pending_data",
        path: "/upload-file",
      },
      {
        title: "View pending approval data",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        path: "/view-pending-approval",
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
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IAllSubRoutes.ADD_CHANNEL,
      },
      {
        title: "Update",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IAllSubRoutes.UPDATE_CHANNEL,
      },
      {
        title: "View All Channels",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IAllSubRoutes.VIEW_ALL_CHANNEL,
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
        value: "map_user_with_channels",
        path: "/map-user-channels",
      },
    ],
  },
];

const NavList = (props: IProps) => {
  const { isNavOpen, handleTypeClick } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const screen = searchParams.get("screen");

  const handleRouteClick = (route: ISubHeaderList) => {
    if (route.value || route.path) {
      handleTypeClick(route.value, route.path);
    }
  };

  const activeCondition = (
    path: string | undefined,
    value: string | undefined
  ) => {
    const currPath = [IAllRoutes.HOME, IAllRoutes.MANAGE_CHANNELS].includes(
      router.pathname as IAllRoutes
    )
      ? value
      : path;
    const isActive = [router.pathname, screen].includes(currPath || "");

    return isActive;
  };

  return (
    <div
      className={`${styles.navlist_wrapper} ${isNavOpen ? styles.open : null}`}
    >
      <div className={styles.navlist_inner}>
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
                <p
                  className={`${styles.topHeading} ${isNavOpen || styles.hide}`}
                >
                  {topHeading}
                </p>
                {subHeaderList.map((item, ind) => {
                  return (
                    <div
                      onClick={() => handleRouteClick(item)}
                      className={`${styles.subHeaderWrapper} ${
                        isNavOpen || styles.navClosed
                      }
                    ${activeCondition(item?.path, item?.value) && styles.active}
                    `}
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
    </div>
  );
};

export default NavList;
