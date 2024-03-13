import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

interface ILogin {
  Username: string;
  Password: string;
}

const callLogin = createAsyncThunk(
  "login",
  async ({ Username, Password }: ILogin) => {
    const url = "/api/Authentication/authenticate";
    const body = {
      Username,
      Password,
    };

    const response = await axiosPublic.post(url, body);
    const accessToken = response.data.accessToken;

    cookie.set("token", accessToken, {
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    });

    return {
      message: "token has been set successfully",
    };
  }
);

export { callLogin };
