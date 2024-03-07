import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";

// const url = "api/Products/GetProducts?pageSize=100&pageNumber=1";

const fetchTableData = createAsyncThunk(
  "table/fetchProducts",
  async (pageNumber) => {
    const response = await axiosPrivate.get(
      `/api/Products/GetProducts?pageSize=100&pageNumber=${pageNumber}`
    );
    return response.data;
  }
);

export { fetchTableData };
