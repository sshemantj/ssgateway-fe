import { handleStatus } from "@/utils/handleStatus";
import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
import { API_BASE_URL } from "../constants/allEnv";
const cookie = new Cookies();

const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = cookie.get("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);
axiosPrivate.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    const { response, message } = error;
    handleStatus(response?.status, message);
    if (error.response) {
      console.error("Response error:", error.response.data);
      // Log response data for errors
      return Promise.reject(error); // Always re-throw the error
    } else {
      console.error("Network error:", error.message); // Log network-related errors
      return Promise.reject(error); // Always re-throw the error
    }
  }
);

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export { axiosPrivate, axiosPublic };
