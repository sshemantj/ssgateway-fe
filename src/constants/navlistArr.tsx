import {
  IAllRoutes,
  IChannelMappingSubRoutes,
  IChannelSubRoutes,
  IFileManagementSubRoutes,
  IStoreMappingSubRoutes,
} from "@/constants/allRoutes";
import { IProductsTypes } from "@/interfaces/product";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HouseIcon from "@mui/icons-material/House";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import QueueIcon from "@mui/icons-material/Queue";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ISubHeaderList {
  title: string;
  icon?: string | StaticImport;
  iconJsx?: JSX.Element;
  value?: string;
  path?: string;
  roles: string[];
}

export interface INavListArr {
  topHeading: string;
  roles: string[];

  subHeaderList: ISubHeaderList[];
}

export const navListArr: INavListArr[] = [
  {
    topHeading: "Listing",
    roles: ["admin", "user"],
    subHeaderList: [
      {
        title: "Unapproved",
        icon: "",
        iconJsx: <HouseIcon color="inherit" />,
        value: IProductsTypes.UNAPPROVED,
        path: IAllRoutes.DASHBOARD,
        roles: ["admin", "user"],
      },
      {
        title: "Approved",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        value: IProductsTypes.APPROVED,
        path: IAllRoutes.DASHBOARD,
        roles: ["admin", "user"],
      },
    ],
  },
  {
    topHeading: "Bulk Uploads",
    roles: ["admin", "user"],
    subHeaderList: [
      {
        title: "Pending approval data",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        // value: "upload_pending_data",
        path: IAllRoutes.FILE_MANAGEMENT,
        value: IFileManagementSubRoutes.UPLOAD_FILE,
        roles: ["admin", "user"],
      },
      // {
      //   title: "View pending approval data",
      //   icon: "",
      //   iconJsx: <WalletIcon color="inherit" />,
      //   path: IAllRoutes.FILE_MANAGEMENT,
      //   value: IFileManagementSubRoutes.VIEW_PENDING_APROVAL,
      //   roles: ["admin", "user"],
      // },
      {
        title: "Bulk Channel Mappings",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.CHANNEL_MAPPINGS,
        value: IChannelMappingSubRoutes.BULK_UPLOAD,
        roles: ["admin", "user"],
      },
    ],
  },

  {
    topHeading: "Manage Channels",
    roles: ["admin"],
    subHeaderList: [
      {
        title: "Add",
        icon: "",
        iconJsx: <OfflineBoltIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.ADD_CHANNEL,
        roles: ["admin"],
      },
      {
        title: "Update",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.UPDATE_CHANNEL,
        roles: ["admin"],
      },
      {
        title: "View All Channels",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.VIEW_ALL_CHANNEL,
        roles: ["admin"],
      },
    ],
  },
  {
    topHeading: "Channel Mapping",
    roles: ["admin"],
    subHeaderList: [
      // {
      //   title: "View User channel",
      //   icon: "",
      //   iconJsx: <OfflineBoltIcon color="inherit" />,
      //   path: IAllRoutes.CHANNEL_MAPPINGS,
      //   value: IChannelMappingSubRoutes.VIEW_CHANNEL,
      //   roles: ["admin"],
      // },
      {
        title: "Map User with channels",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.CHANNEL_MAPPINGS,
        value: IChannelMappingSubRoutes.MAP_CHANNEL,
        roles: ["admin"],
      },
    ],
  },
  {
    topHeading: "Store Mapping",
    roles: ["admin"],
    subHeaderList: [
      {
        title: "Store Mapping",
        icon: "",
        iconJsx: <OfflineBoltIcon color="inherit" />,
        path: IAllRoutes.STORE_MAPPING,
        value: IStoreMappingSubRoutes.SINGLE_MAPPING,
        roles: ["admin"],
      },
      {
        title: "Bulk Mapping",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.STORE_MAPPING,
        value: IStoreMappingSubRoutes.BULK_MAPPING,
        roles: ["admin"],
      },
    ],
  },
];
