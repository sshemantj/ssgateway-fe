import { IProductsTypes } from "@/interfaces/product";

export enum IAllRoutes {
  HOME = "/",
  LOGIN = "/login",
  MANAGE_CHANNELS = "/manage-channels",
}

export enum IAllSubRoutes {
  ADD_CHANNEL = "addChannel",
  UPDATE_CHANNEL = "updateChannel",
  VIEW_ALL_CHANNEL = "viewAllChannel",
}

export interface ISubRoutes {
  [IAllRoutes.MANAGE_CHANNELS]:
    | "addChannel"
    | "updateChannel"
    | "viewAllChannel";
  [IAllRoutes.HOME]: IProductsTypes.APPROVED | IProductsTypes.UNAPPROVED;
}
