"use client";
import axios from "axios";
import { FireToast } from "./FireToast";
const instance = axios.create({
  baseURL: process.env.API_KEY,
  "Content-Type": "multipart/form-data",
});

instance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const lang = localStorage.getItem("i18nextLng");
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `Bearer 6|DX23SZVnhkRi9Tj90VH8I7x3UOQLWTEQYyL6AVuN572c94e2`;
    config.headers["X-localization"] = lang;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (response.data.status === false) {
    for (const key in response.data.messages[0]) {
      if (response.data.messages[0].hasOwnProperty(key)) {
        const messages = response.data.messages[0][key];
        for (const message of messages) {
          FireToast("error", message);
        }
      }
    }
  }
  return response;
});

export default instance;
