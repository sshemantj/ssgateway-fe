import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";

interface IFetchTableData {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

interface IGetStyleVariants {
  productid: string;
}
interface IGetSizeVariants {
  stylevairiantId: string;
}

const fetchTableData = createAsyncThunk(
  "table/fetchProducts",
  async ({
    pageNumber = 1,
    pageSize = 100,
    searchTerm = "",
  }: IFetchTableData) => {
    try {
      const url = "/api/Products/GetApprovedProducts";
      const search = searchTerm ? { searchTerm } : {};
      const params = {
        pageNumber,
        pageSize,
        ...search,
      };

      const response = await axiosPrivate.get(url, {
        params,
      });

      return response.data;
    } catch (error: any) {
      console.log(error.message);
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

export { fetchTableData, getStyleVariants, getSizeVariants };
