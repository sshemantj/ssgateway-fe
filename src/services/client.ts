import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../constants/allEnv";
import { handleStatus } from "@/utils/handleStatus";

const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);
axiosPrivate.interceptors.response.use(
  (config) => {
    return config;
  },
  (err: AxiosError) => {
    const { response } = err;
    if (response?.status) handleStatus(response?.status);
  }
);

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export { axiosPrivate, axiosPublic };
