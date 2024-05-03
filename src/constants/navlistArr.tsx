import {
  IAllRoutes,
  IChannelMappingSubRoutes,
  IChannelSubRoutes,
  IFileManagementSubRoutes,
  IProfileSubRoutes,
} from "@/constants/allRoutes";
import { IProductsTypes } from "@/interfaces/product";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import HouseIcon from "@mui/icons-material/House";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ServiceIcon from "@mui/icons-material/HomeRepairService";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import QueueIcon from "@mui/icons-material/Queue";

export interface ISubHeaderList {
  title: string;
  icon?: string | StaticImport;
  iconJsx?: JSX.Element;
  value?: string;
  path?: string;
}

export interface INavListArr {
  topHeading: string;
  subHeaderList: ISubHeaderList[];
}

export const navListArr: INavListArr[] = [
  {
    topHeading: "Listing",
    subHeaderList: [
      {
        title: "Unapproved",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
        value: IProductsTypes.UNAPPROVED,
        path: IAllRoutes.DASHBOARD,
      },
      {
        title: "Approved",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        value: IProductsTypes.APPROVED,
        path: IAllRoutes.DASHBOARD,
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
        // value: "upload_pending_data",
        path: IAllRoutes.FILE_MANAGEMENT,
        value: IFileManagementSubRoutes.UPLOAD_FILE,
      },
      {
        title: "View pending approval data",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        path: IAllRoutes.FILE_MANAGEMENT,
        value: IFileManagementSubRoutes.VIEW_PENDING_APROVAL,
      },
    ],
  },
  {
    topHeading: "User profile",
    subHeaderList: [
      {
        title: "Update password",
        icon: "",
        path: IAllRoutes.USER_PROFILE,
        value: IProfileSubRoutes.UPDATE_PASSWORD,
        iconJsx: <FolderCopyIcon color="inherit" />,
      },
      {
        title: "Update Profile",
        icon: "",
        path: IAllRoutes.USER_PROFILE,
        value: IProfileSubRoutes.UPDATE_PROFILE,
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
        value: IChannelSubRoutes.ADD_CHANNEL,
      },
      {
        title: "Update",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.UPDATE_CHANNEL,
      },
      {
        title: "View All Channels",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.VIEW_ALL_CHANNEL,
      },
    ],
  },
  {
    topHeading: "Channel Mapping",
    subHeaderList: [
      // {
      //   title: "View User channel",
      //   icon: "",
      //   iconJsx: <OfflineBoltIcon color="inherit" />,
      //   path: IAllRoutes.CHANNEL_MAPPINGS,
      //   value: IChannelMappingSubRoutes.VIEW_CHANNEL,
      // },
      {
        title: "Map User with channels",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.CHANNEL_MAPPINGS,
        value: IChannelMappingSubRoutes.MAP_CHANNEL,
      },
    ],
  },
];
