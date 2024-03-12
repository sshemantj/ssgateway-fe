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
interface ILogin {
  Username: string;
  Password: string;
}

const callLogin = createAsyncThunk(
  "login",
  async ({ Username, Password }: ILogin) => {
    const url = "/api/Authentication/authenticate";
    const params = {
      Username,
      Password,
    };

    const response = await axiosPrivate.get(url, {
      params,
    });

    return response.data;
  }
);

const fetchTableData = createAsyncThunk(
  "table/fetchProducts",
  async ({
    pageNumber = 1,
    pageSize = 100,
    searchTerm = "",
  }: IFetchTableData) => {
    const url = "/api/Products/GetProducts";
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
  }
);

const getStyleVariants = createAsyncThunk(
  "table/getStyleVariants",
  async ({ productid }: IGetStyleVariants) => {
    const url = "/api/Products/GetStylevariant";
    const params = {
      productid,
    };

    const response = await axiosPrivate.get(url, {
      params,
    });

    return response.data;
  }
);

const getSizeVariants = createAsyncThunk(
  "table/getSizeVariants",
  async ({ stylevairiantId }: IGetSizeVariants) => {
    const url = "/api/Products/GetSizevariant";
    const params = {
      stylevairiantId,
    };

    const response = await axiosPrivate.get(url, {
      params,
    });

    return response.data;
  }
);

export { callLogin, fetchTableData, getStyleVariants, getSizeVariants };
