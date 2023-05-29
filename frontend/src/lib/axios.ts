import axios from "axios";
import { redirect } from "next/navigation";

export const backend = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

backend.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status > 400) {
      if (error.response.status === 401) {
        redirect("/auth/login?status=AccessExpired&cleared=false");
      }
      return Promise.reject(error.response);
    }
    throw new Error(error.response.status);
  }
);
