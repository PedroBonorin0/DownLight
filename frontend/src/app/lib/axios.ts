import axios from "axios";
import { redirect } from "next/navigation";

export const backend = axios.create({
  baseURL: "http://localhost:3333/",
});

backend.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      redirect("/auth/login?status=AccessExpired&cleared=false");
    }
    throw new Error(error.response.status);
  }
);
