import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";

interface IFetchTableData {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

const fetchTableData = createAsyncThunk(
  "table/fetchProducts",
  async ({
    pageNumber = 1,
    pageSize = 100,
    searchTerm = "",
  }: IFetchTableData) => {
    const search = searchTerm ? { searchTerm } : {};
    const params = {
      pageNumber,
      pageSize,
      ...search,
    };

    const response = await axiosPrivate.get(`/api/Products/GetProducts`, {
      params,
    });

    return response.data;
  }
);

export { fetchTableData };
