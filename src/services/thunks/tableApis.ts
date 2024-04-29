import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";
import { IProducts } from "@/store/slices/gatewaySlice";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";

export interface IFetchTableData {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  channelid?: string;
  type: IProducts;
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
  stylevariantcode: string;
}

export interface ICreateChannelPayload {
  payload: {
    channelid: string;
    channelname: string;
    description: string;
    isactive: boolean;
  };
}

const fetchTableData = createAsyncThunk(
  "table/fetchProducts",
  async ({
    pageNumber = 1,
    pageSize = 100,
    searchTerm = "",
    type,
    channelid,
  }: IFetchTableData) => {
    try {
      if (!channelid && type !== IProductsTypes.UNAPPROVED) {
        throw new Error("channel not selected!");
      }
      let product = "";
      switch (type) {
        case IApprovedPdTypes.MAPPED:
          product = "GetApprovedMappedSizevariants";
          break;
        case IProductsTypes.APPROVED:
          product = "GetApprovedUnMappedSizevariants";
          break;
        case IProductsTypes.UNAPPROVED:
          product = "GetUnAprrovedsizevariants";
          break;
      }
      const url = `/api/Products/${product}`;

      const search = searchTerm ? { searchTerm } : {};
      const params = {
        pageNumber,
        pageSize,
        channelid,
        ...search,
      };

      const response = await axiosPrivate.get(url, {
        params,
      });

      return response.data;
    } catch (error: any) {
      return { products: [] };
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }
);

type ICountApis =
  | "GetUnapprovedSizeVariantsCount"
  | "GetApprovedSizeVariantsCount"
  | "GetSizeVariantsCount";

interface ICountApiType {
  type: "mapped" | "unmapped";
}

const getCountApi = createAsyncThunk(
  "table/getCountApi",
  async ({ type }: ICountApiType) => {
    try {
      let api: ICountApis;
      switch (type) {
        case "mapped":
          api = "GetUnapprovedSizeVariantsCount";
          break;
        case "unmapped":
          api = "GetApprovedSizeVariantsCount";
          break;
      }

      const url = `/api/products/${api}`;

      const response = await axiosPrivate.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }
);

const approveSizevariants = createAsyncThunk(
  "table/approveSizevariants",
  async (payload: string[]) => {
    try {
      const url = "/api/Products/ApproveSizevariants";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
};
