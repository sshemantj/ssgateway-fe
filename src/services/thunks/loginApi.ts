import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";

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

export { callLogin };
