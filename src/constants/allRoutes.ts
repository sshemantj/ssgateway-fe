import { IProductsTypes } from "@/interfaces/product";

export enum IAllRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  LOGIN = "/login",
  MANAGE_CHANNELS = "/manage-channels",
  USER_PROFILE = "/user-profile",
  FILE_MANAGEMENT = "/file-management",
  CHANNEL_MAPPINGS = "/channel-mappings",
}

export enum IChannelSubRoutes {
  ADD_CHANNEL = "addChannel",
  UPDATE_CHANNEL = "updateChannel",
  VIEW_ALL_CHANNEL = "viewAllChannel",
}

export enum IProfileSubRoutes {
  UPDATE_PASSWORD = "update-password",
  UPDATE_PROFILE = "update-profile",
}

export enum IFileManagementSubRoutes {
  UPLOAD_FILE = "upload-file",
  VIEW_PENDING_APROVAL = "view-pending-approval",
}

export enum IChannelMappingSubRoutes {
  VIEW_CHANNEL = "view-channels",
  MAP_CHANNEL = "map-channels",
  BULK_UPLOAD = "bulk-upload",
}

export interface ISubRoutes {
  [IAllRoutes.MANAGE_CHANNELS]:
    | "addChannel"
    | "updateChannel"
    | "viewAllChannel";
  [IAllRoutes.HOME]: IProductsTypes.APPROVED | IProductsTypes.UNAPPROVED;
}
