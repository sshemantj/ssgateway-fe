import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";
import { IProducts } from "@/store/slices/gatewaySlice";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";
import { IFileManagementSubRoutes } from "@/constants/allRoutes";

export interface IFetchTableData {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  channelid?: string;
  isLive?: boolean;
  iscatalog?: boolean;
  type: IProducts | IFileManagementSubRoutes.VIEW_PENDING_APROVAL;
}

interface IGetStyleVariants {
  productid: string;
}
interface IGetSizeVariants {
  stylevairiantId: string;
}

interface IAddUserChannelMappings {
  userid: number;
  channelmasterid: number;
}

export interface IPostChannelMapping {
  channelid: string;
  channelname: string;
  sizevariantcode: number;
  stylecode: string;
  StyleVariantCode: string;
}
export interface IPostChannelUnMapping {
  channelid: string;
  channelname: string;
  stylecode: string;
  StyleVariantCode: string;
  sizevariantcode: number;
}

export interface ICreateChannelPayload {
  payload: {
    channelid: string;
    channelname: string;
    description: string;
    isactive: boolean;
  };
}

interface IParams {
  pageNumber: number;
  pageSize: number;
  channelid?: string;
  search?: string;
  isLive?: boolean;
  iscatalog?: boolean;
}

const fetchTableData = createAsyncThunk(
  "table/fetchProducts",
  async ({
    pageNumber = 1,
    pageSize = 100,
    searchTerm = "",
    type,
    channelid,
    isLive,
    iscatalog,
  }: IFetchTableData) => {
    try {
      if (
        !channelid &&
        [IApprovedPdTypes.MAPPED, IApprovedPdTypes.UN_MAPPED].includes(
          type as any
        )
      ) {
        throw new Error("channel not selected!");
      }

      const search = searchTerm ? { searchTerm } : {};
      const params: IParams = {
        pageNumber,
        pageSize,
        channelid,
        ...search,
      };

      let product = "";
      switch (type) {
        case IApprovedPdTypes.MAPPED:
          product = "GetApprovedMappedSizevariants";
          if (typeof isLive !== "undefined") params.isLive = isLive;
          if (typeof iscatalog !== "undefined") params.iscatalog = iscatalog;
          break;
        case IProductsTypes.APPROVED:
          product = "GetApprovedUnMappedSizevariants";
          break;
        case IProductsTypes.UNAPPROVED:
          product = "GetUnAprrovedsizevariants";
          break;
        case IFileManagementSubRoutes.VIEW_PENDING_APROVAL:
          product = "GetPendingUploadedData";
          break;
      }
      const url = `/api/Products/${product}`;

      const response = await axiosPrivate.get(url, {
        params,
      });

      return { data: response?.data, type };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const getStyleVariants = createAsyncThunk(
  "table/getStyleVariants",
  async ({ productid }: IGetStyleVariants) => {
    try {
      const url = "/api/Products/GetStylevariant";
      const params = {
        productid,
      };

      const response = await axiosPrivate.get(url, {
        params,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const getSizeVariants = createAsyncThunk(
  "table/getSizeVariants",
  async ({ stylevairiantId }: IGetSizeVariants) => {
    try {
      const url = "/api/Products/GetSizevariant";
      const params = {
        stylevairiantId,
      };

      const response = await axiosPrivate.get(url, {
        params,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const createChannelMaster = createAsyncThunk(
  "table/createChannelMaster",
  async ({ payload }: ICreateChannelPayload) => {
    try {
      const url = "/api/Channel/CreateChannelMaster";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const getChannelMasters = createAsyncThunk(
  "table/getChannelMasters",
  async () => {
    try {
      const url = "/api/Channel/GetChannelMasters";

      const response = await axiosPrivate.get(url);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const getUserChannelMappings = createAsyncThunk(
  "table/getUserChannelMappings",
  async () => {
    try {
      const url = "/api/channel/GetUserChannelMappings";

      const response = await axiosPrivate.get(url);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

type ICountApis =
  | "GetApprovedMappedSizevariantsCount"
  | "GetApprovedUnMappedSizevariantsCount";

interface ICountApiType {
  type: "mapped" | "unmapped";
  channelid: string;
}

const getCountApi = createAsyncThunk(
  "table/getCountApi",
  async ({ type, channelid }: ICountApiType) => {
    try {
      let api: ICountApis;
      switch (type) {
        case "mapped":
          api = "GetApprovedMappedSizevariantsCount";
          break;
        case "unmapped":
          api = "GetApprovedUnMappedSizevariantsCount";
          break;
      }

      const url = `/api/products/${api}`;

      const params = {
        channelid,
      };

      const response = await axiosPrivate.get(url, {
        params,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const postChannelMapping = createAsyncThunk(
  "table/MapChannel",
  async (payload: IPostChannelMapping[]) => {
    try {
      const url = "/api/Channel/MapChannel";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
const postChannelUnMapping = createAsyncThunk(
  "table/UnMapProductChannel",
  async (payload: IPostChannelUnMapping[]) => {
    try {
      const url = "/api/Channel/UnMapProductChannel";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const addUserChannelMappings = createAsyncThunk(
  "table/addUserChannelMappings",
  async (payload: IAddUserChannelMappings[]) => {
    try {
      const url = "/api/Channel/AddUserChannelMappings";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const uploadDataforPendingApproval = createAsyncThunk(
  "table/uploadDataforPendingApproval",
  async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = "/api/Products/UploadDataforPendingApproval";

      const response = await axiosPrivate.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
const bulkUploadChannelMappings = createAsyncThunk(
  "table/bulkUploadChannelMappings",
  async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = "/api/Channel/BulkProductChannelMapping";

      const response = await axiosPrivate.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "text/csv",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

interface IApproveSizeVariants {
  payload: string[];
  source: "UI" | "FILEUPLOAD";
}

const approveSizevariants = createAsyncThunk(
  "table/approveSizevariants",
  async ({ payload, source }: IApproveSizeVariants) => {
    try {
      const url = `/api/Products/ApproveSizevariants?source=${source}`;

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const updateChannelMaster = createAsyncThunk(
  "table/updateChannelMaster",
  async ({ payload }: ICreateChannelPayload) => {
    try {
      const url = "/api/Channel/UpdateChannelMaster";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export interface IUpdatePassword {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

const updatePassword = createAsyncThunk(
  "table/updatePassword",
  async (payload: IUpdatePassword) => {
    try {
      const url = "/api/Authentication/resetpassword";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export interface IUpdateProfile {
  id: string;
  email: string;
  isactive: boolean;
}

const updateProfile = createAsyncThunk(
  "table/updateProfile",
  async (payload: IUpdateProfile) => {
    try {
      const url = "/api/Authentication/UpdateUser";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export {
  fetchTableData,
  getStyleVariants,
  getSizeVariants,
  getChannelMasters,
  getUserChannelMappings,
  postChannelMapping,
  createChannelMaster,
  approveSizevariants,
  uploadDataforPendingApproval,
  addUserChannelMappings,
  getCountApi,
  updateChannelMaster,
  updatePassword,
  updateProfile,
  postChannelUnMapping,
  bulkUploadChannelMappings,
};
