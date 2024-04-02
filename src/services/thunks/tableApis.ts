import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";
import { IProducts } from "@/store/slices/gatewaySlice";

export interface IFetchTableData {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  channelid?: string;
  type: IProducts
}

interface IGetStyleVariants {
  productid: string;
}
interface IGetSizeVariants {
  stylevairiantId: string;
}
export interface IPostChannelMapping {
  channelmasterid: number;
  channelid: string;
  channelname: string;
  productid: number;
  productcode: string;
  stylevariantid: string;
  stylecode: string;
  sizevariantid: number;
  sizecode: string;
  isactive: boolean;
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
      let product = "";
      switch (type) {
        case "mappedProducts":
          product = "GetApprovedMappedProducts";
          break;
        case "aprovedProducts":
          product = "GetApprovedProducts";
          break;
        case "unAprovedProducts":
          product = "GetUnAprrovedProducts";
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

export {
  fetchTableData,
  getStyleVariants,
  getSizeVariants,
  getChannelMasters,
  getUserChannelMappings,
  postChannelMapping,
};
