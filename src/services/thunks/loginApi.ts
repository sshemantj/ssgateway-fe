import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate, axiosPublic } from "../client";
import { Cookies } from "react-cookie";
import { getCookie, setCookie } from "@/utils";

const cookie = new Cookies();

interface ILogin {
  Username: string;
  Password: string;
}

const callLogin = createAsyncThunk(
  "login",
  async ({ Username, Password }: ILogin) => {
    try {
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

      const token = getCookie("token");
      if (!token) setCookie("token", accessToken);
      return {
        message: "token has been set successfully",
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const getUserDetails = createAsyncThunk(
  "table/getUserDetails",
  async (username: string) => {
    try {
      const url = `api/Authentication/get/${username}`;

      const response = await axiosPrivate.get(url);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export { callLogin, getUserDetails };
