import axios from "axios";
import { API_BASE_URL } from "../constants/allEnv";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
